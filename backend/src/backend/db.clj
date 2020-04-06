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
