(ns backend.db
  (:require [clojure.java.jdbc :as jdbc]))

;; TODO: pull credentials from environment variables
(def pg-db {:dbtype "postgres"
            :dbname "covid"
            :host "localhost"
            :user "postgres"
            :password "postgres"})

(defn get-counties []
  (jdbc/query pg-db
              ["select county, cases from covid.nytimes_us_counties"]))

(defn get-case-count []
  (-> (jdbc/query pg-db
                  ["select sum(cases) as case_count from covid.nytimes_us_counties"])
      (first)))

(defn get-death-count []
  (-> (jdbc/query pg-db
                  ["select sum(deaths) as death_count from covid.nytimes_us_counties"])
      (first)))
