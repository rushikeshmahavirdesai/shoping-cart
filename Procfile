# release: ENV_SILENT=true node ace migration:run --force
# web: ENV_SILENT=true npm start
web: node build/server.js
release: node build/ace migration:run --force
