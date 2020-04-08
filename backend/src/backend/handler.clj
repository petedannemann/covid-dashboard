(ns backend.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.json :as middleware]
            [ring.util.response :refer [response]]
            [backend.db :as db]))

(defn counties [request]
          (response {:body (db/get-counties)}))

(defn case-count [request]
            (response {:body (db/get-case-count)}))

(defn death-count [request]
  (response {:body (db/get-death-count)}))

(defroutes app-routes
  (GET "/counties" [] counties)
  (GET "/case-count" [] case-count)
  (GET "/death-count" [] death-count)
  (route/not-found "Not Found"))

(def app
  (-> (handler/api app-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-params)
      (middleware/wrap-json-response)
      (wrap-cors :access-control-allow-origin [#".*"] :access-control-allow-methods [:get])))
