(ns backend.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.json :as middleware]
            [ring.util.response :refer [response]]
            [backend.db :as db]))

(defn cases-and-deaths [request]
  (response (db/get-cases-and-deaths)))

(defroutes app-routes
  (GET "/cases-and-deaths" [] cases-and-deaths)
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (-> (handler/api app-routes)
      (middleware/wrap-json-params)
      (middleware/wrap-json-response)
      (wrap-cors :access-control-allow-origin [#".*"] :access-control-allow-methods [:get])))
