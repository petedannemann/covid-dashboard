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
                  ["select sum(cases) as case_count from covid.nytimes_us_counties"])
      first))

(defn get-death-count []
  (-> (jdbc/query pg-db
                  ["select sum(deaths) as death_count from covid.nytimes_us_counties"])
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

#_(map #(update-in % [:data] json/read-str))
