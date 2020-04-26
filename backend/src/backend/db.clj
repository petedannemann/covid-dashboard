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
                  ["SELECT
                      SUM(cases) AS case_count
                    FROM
                      covid.nytimes_us_counties"])
      first))

(defn get-death-count []
  (-> (jdbc/query pg-db
                  ["SELECT
                      SUM(deaths) AS death_count
                    FROM
                      covid.nytimes_us_counties"])
      first))

(defn get-cases-by-state []
  (-> (jdbc/query pg-db
                   ["SELECT
                       state,
                       SUM(cases) AS number_of_cases
                     FROM covid.nytimes_us_counties
                     GROUP BY state
                     ORDER BY number_of_cases"])))

(defn get-deaths-by-state []
  (-> (jdbc/query pg-db
                   ["SELECT
                       state,
                       SUM(deaths) AS number_of_deaths
                     FROM covid.nytimes_us_counties
                     GROUP BY state
                     ORDER BY number_of_deaths"])))

(defn get-cases-over-time []
  (-> (jdbc/query pg-db
                  ["SELECT
                      date AS x,
                      SUM(cases) AS y
                    FROM covid.nytimes_us_counties
                    GROUP BY date
                    ORDER BY date"])))

(defn get-deaths-over-time []
  (-> (jdbc/query pg-db
                  ["SELECT
                      date AS x,
                      SUM(deaths) AS y
                    FROM covid.nytimes_us_counties
                    GROUP BY date
                    ORDER BY date"])))

#_(map #(update-in % [:data] json/read-str))
