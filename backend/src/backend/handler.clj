(ns backend.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.json :as middleware]
            [ring.util.response :refer [response]]
            [backend.db :as db]))

(defn cases-by-state [request]
  (response (db/get-cases-by-state)))

(defn case-count [request]
  (response (db/get-case-count)))

(defn deaths-by-state [request]
  (response (db/get-deaths-by-state)))

(defn death-count [request]
  (response (db/get-death-count)))

(defn cases-over-time [request]
  (response [{:id "all" :data (db/get-cases-over-time)}]))

(defn deaths-over-time [request]
  (response [{:id "all" :data (db/get-deaths-over-time)}]))

(defroutes app-routes
  (GET "/cases-by-state" [] cases-by-state)
  (GET "/case-count" [] case-count)
  (GET "/deaths-by-state" [] deaths-by-state)
  (GET "/death-count" [] death-count)
  (GET "/cases-over-time" [] cases-over-time)
  (GET "/deaths-over-time" [] deaths-over-time)
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (-> (handler/api app-routes)
      (middleware/wrap-json-params)
      (middleware/wrap-json-response)
      (wrap-cors :access-control-allow-origin [#".*"] :access-control-allow-methods [:get])))
