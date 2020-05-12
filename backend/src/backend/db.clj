(ns backend.db
  (:require [clojure.data.json :as json]
            [clojure.java.jdbc :as jdbc]))

;; TODO: pull credentials from environment variables
(def pg-db {:dbtype "postgres"
            :dbname "covid"
            :host "localhost"
            :user "postgres"
            :password "postgres"})

(defn get-cases-and-deaths []
  (-> (jdbc/query pg-db
                  ["SELECT
                     date,
                     state,
                     new_cases,
                     new_deaths
                   FROM covid.new_cases_and_deaths_vw"])))
