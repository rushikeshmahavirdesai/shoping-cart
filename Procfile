# release: ENV_SILENT=true node ace migration:run --force 
web: npm run start:prod
release: ENV_SILENT=true node ace migration:run --force && node ace db:seed 
# web: npm run start:prod