# Makefile pour Symfony API + Vue.js Frontend

.PHONY: help start stop up cache-clear cc migration install db-create db-drop db-reset fixtures entity tree tree-simple tree-files lint format

# Variables
PROJECT_NAME = stadi
WEBAPP_FOLDER = /var/www/html/webapp
API_FOLDER = /var/www/html/backend

## —— 🎵 Makefile Symfony + Vue.js 🎵 ——————————————————————————————————
help: ## Liste des commandes disponibles
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##)|(^##)' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}{printf "  \033[32m%-20s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— 🚀 Services ————————————————————————————————————————————————————————
start: ## Démarre DDEV
	ddev start

stop: ## Arrête DDEV
	ddev stop

up: start ## Démarre DDEV et lance le serveur Vue.js
	ddev exec --dir $(WEBAPP_FOLDER) npm run dev

## —— 🐘 API Symfony —————————————————————————————————————————————————————
cache-clear: ## Vide le cache Symfony
	ddev exec --dir $(API_FOLDER) php bin/console cache:clear

cc: cache-clear ## Raccourci pour cache-clear

migration: ## Génère une migration
	ddev exec --dir $(API_FOLDER) php bin/console make:migration

migrate: ## Exécute les migrations
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:migrations:migrate -n

entity: ## Crée une entité (ex: make entity NAME="User")
ifndef NAME
	@echo "❌ Spécifiez le nom avec NAME=..."
	@echo "💡 Exemple : make entity NAME=\"User\""
	@exit 1
endif
	ddev exec --dir $(API_FOLDER) php bin/console make:entity $(NAME)

fixtures: ## Charge les fixtures
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:fixtures:load -n

## —— 🗃️ Base de données ————————————————————————————————————————————————
db-create: ## Crée la base de données
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:database:create --if-not-exists

db-drop: ## Supprime la base de données
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:database:drop --force --if-exists

db-reset: ## Recrée la base de données complètement
	@make db-drop
	@make db-create
	@make migrate

## —— 📦 Installation ————————————————————————————————————————————————————
install: ## Installation complète du projet
	ddev start
	ddev composer install --working-dir=backend
	ddev exec --dir $(WEBAPP_FOLDER) npm install
	@echo "✅ Installation terminée !"
	@echo "🔗 API Symfony: https://$(PROJECT_NAME).ddev.site"
	@echo "🔗 Frontend Vue: https://app.$(PROJECT_NAME).ddev.site"

## —— 🛠️ Outils ——————————————————————————————————————————————————————————
ssh: ## Shell dans le conteneur principal
        ddev ssh

lint: ## Lint du code Vue
        ddev exec --dir $(WEBAPP_FOLDER) npm run lint

format: ## Formatage du code Vue
        ddev exec --dir $(WEBAPP_FOLDER) npm run format

tree: ## Affiche l'arborescence des fichiers du projet
	@echo "📁 Arborescence du projet depuis $(shell pwd):"
	@echo ""
	@if command -v tree >/dev/null 2>&1; then \
		echo "Utilisation de tree (natif):"; \
		tree -a -I 'node_modules|vendor|.git|var|.ddev|.idea|*.log|cache' --dirsfirst -L 4; \
	else \
		echo "Simulation tree avec find/awk:"; \
		find . -type d \( -name vendor -o -name node_modules -o -name .git -o -name var -o -name .ddev -o -name .idea -o -name cache \) -prune -o -print | \
		grep -v '/\.' | \
		sort | \
		awk '{ \
			depth = gsub(/\//, "/"); \
			indent = ""; \
			for(i=1; i<depth; i++) indent = indent "│   "; \
			if(depth > 0) { \
				if($$0 ~ /\/$/) { \
					gsub(/\/$/, "", $$0); \
					split($$0, parts, "/"); \
					printf "%s├── 📁 %s/\n", indent, parts[length(parts)]; \
				} else { \
					split($$0, parts, "/"); \
					name = parts[length(parts)]; \
					icon = "📄"; \
					if(name ~ /\.(js|ts|vue)$$/) icon = "🟨"; \
					else if(name ~ /\.(php)$$/) icon = "🐘"; \
					else if(name ~ /\.(json|yaml|yml)$$/) icon = "⚙️"; \
					else if(name ~ /\.(md|txt)$$/) icon = "📝"; \
					else if(name ~ /Makefile$$/) icon = "🔧"; \
					printf "%s├── %s %s\n", indent, icon, name; \
				} \
			} else { \
				printf "📁 %s/\n", $$0; \
			} \
		}'; \
	fi
	@echo ""
	@echo "Exclusions: vendor/, node_modules/, .git/, var/, .ddev/, .idea/, cache/"

tree-simple: ## Affiche une arborescence simplifiée (dossiers uniquement)
	@echo "📁 Structure des dossiers principaux:"
	@echo ""
	@find . -maxdepth 3 -type d \( -name vendor -o -name node_modules -o -name .git -o -name var -o -name .ddev -o -name .idea \) -prune -o -type d -print | \
	grep -v '/\.' | \
	sort | \
	sed 's|^\./||' | \
	awk -F/ '{ \
		if(NF==1) printf "📁 %s/\n", $$1; \
		else if(NF==2) printf "├── 📁 %s/\n", $$2; \
		else if(NF==3) printf "│   ├── 📁 %s/\n", $$3; \
	}'
	@echo ""

tree-files: ## Affiche les fichiers importants du projet
	@echo "📄 Fichiers de configuration principaux:"
	@echo ""
	@find . -maxdepth 2 -type f \( \
		-name "*.json" -o \
		-name "*.yaml" -o \
		-name "*.yml" -o \
		-name "Makefile" -o \
		-name "*.md" -o \
		-name ".env*" -o \
		-name "*.conf" \
	\) | \
	grep -v node_modules | \
	sort | \
	sed 's|^\./||' | \
	awk -F/ '{ \
		icon = "📄"; \
		name = $$NF; \
		if(name ~ /\.json$$/) icon = "⚙️"; \
		else if(name ~ /\.(yaml|yml)$$/) icon = "⚙️"; \
		else if(name ~ /Makefile$$/) icon = "🔧"; \
		else if(name ~ /\.md$$/) icon = "📝"; \
		else if(name ~ /\.env/) icon = "🔐"; \
		else if(name ~ /\.conf$$/) icon = "🌐"; \
		if(NF==1) printf "%s %s\n", icon, $$1; \
		else printf "├── %s %s\n", icon, $$NF; \
	}'
	@echo ""
