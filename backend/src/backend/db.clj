(ns backend.db
  (:require [clojure.data.json :as json]
            [clojure.java.jdbc :as jdbc]))

;; TODO: pull credentials from environment variables
(def pg-db {:dbtype "postgres"
            :dbname "covid"
            :host "localhost"
            :user "postgres"
            :password "postgres"})

(defn get-case-count []
  (-> (jdbc/query pg-db
                  ["WITH cte AS (
                       SELECT
                         state,
                         cases,
                         ROW_NUMBER() OVER (PARTITION BY state ORDER BY DATE DESC) AS rn
                       FROM covid.nytimes_us_states
                    )
                    SELECT
                      SUM(cases) AS case_count
                    FROM cte
                    WHERE rn = 1"])
      first))

(defn get-death-count []
  (-> (jdbc/query pg-db
                  ["WITH cte AS (
                       SELECT
                         state,
                         deaths,
                         ROW_NUMBER() OVER (PARTITION BY state ORDER BY DATE DESC) AS rn
                       FROM covid.nytimes_us_states
                    )
                    SELECT
                      SUM(deaths) AS death_count
                    FROM cte
                    WHERE rn = 1"])
      first))

(defn get-cases-by-state []
  (-> (jdbc/query pg-db
                   ["WITH cte AS (
                       SELECT
                         state,
                         cases,
                         ROW_NUMBER() OVER (PARTITION BY state ORDER BY DATE DESC) AS rn
                       FROM covid.nytimes_us_states
                     )
                     SELECT
                       state,
                       cases AS number_of_cases
                     FROM cte
                     WHERE rn = 1
                     ORDER BY cases"])))

(defn get-deaths-by-state []
  (-> (jdbc/query pg-db
                   ["WITH cte AS (
                       SELECT
                         state,
                         deaths,
                         ROW_NUMBER() OVER (PARTITION BY state ORDER BY DATE DESC) AS rn
                       FROM covid.nytimes_us_states
                     )
                     SELECT
                       state,
                       deaths AS number_of_deaths
                     FROM cte
                     WHERE rn = 1
                     ORDER BY deaths"])))

(defn get-cases-over-time []
  (-> (jdbc/query pg-db
                  ["WITH cte AS (
                      SELECT
                        date,
                        SUM(cases) AS number_of_cases
                      FROM covid.nytimes_us_states
                      GROUP BY date
                    )
                    SELECT
                      date AS x,
                      number_of_cases - LAG(number_of_cases) OVER (ORDER BY date) AS y
                    FROM cte"])))

(defn get-deaths-over-time []
  (-> (jdbc/query pg-db
                  ["WITH cte AS (
                      SELECT
                        date,
                        SUM(deaths) AS number_of_deaths
                      FROM covid.nytimes_us_states
                      GROUP BY date
                    )
                    SELECT
                      date AS x,
                      number_of_deaths - LAG(number_of_deaths) OVER (ORDER BY date) AS y
                    FROM cte"])))

#_(map #(update-in % [:data] json/read-str))
