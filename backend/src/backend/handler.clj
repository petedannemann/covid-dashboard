(ns backend.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.json :as middleware]
            [ring.util.response :refer [response]]
            [backend.db :refer [get-counties]]))

(defn handler [request]
  (response {:body (get-counties)}))

(defroutes app-routes
  (GET "/counties" [] handler)
  (route/not-found "Not Found"))

(def app
  (-> (handler/api app-routes)
      (middleware/wrap-json-body)
      (middleware/wrap-json-params)
      (middleware/wrap-json-response)
      (wrap-cors :access-control-allow-origin [#".*"] :access-control-allow-methods [:get])))
