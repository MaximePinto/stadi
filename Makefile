# Makefile pour Symfony API + Vue.js Frontend

.PHONY: help start stop up cache-clear cc migration install db-create db-drop db-reset fixtures entity tree tree-simple tree-files lint format db-init create-admin migration-create migration-status migration-list backend webapp backend-shell webapp-shell
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
	make db-init
	make fixtures

stop: ## Arrête DDEV
	ddev stop

up: start ## Démarre DDEV et lance le serveur Vue.js
	ddev exec --dir $(WEBAPP_FOLDER) npm run dev

run: ## Lance le serveur Vue.js
	ddev exec --dir $(WEBAPP_FOLDER) npm run dev

## —— 🐘 API Symfony —————————————————————————————————————————————————————
cache-clear: ## Vide le cache Symfony
	ddev exec --dir $(API_FOLDER) php bin/console cache:clear

cc: cache-clear ## Raccourci pour cache-clear

entity: ## Crée une entité (ex: make entity NAME="User")
ifndef NAME
	@echo "❌ Spécifiez le nom avec NAME=..."
	@echo "💡 Exemple : make entity NAME=\"User\""
	@exit 1
endif
	ddev exec --dir $(API_FOLDER) php bin/console make:entity $(NAME)

routes:
	make backend CMD='php bin/console debug:router'

fixtures: ## Charge les fixtures
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:fixtures:load -n

create-admin: ## Crée l'utilisateur admin via les fixtures
	@echo "🔐 Chargement des fixtures (admin@admin.com / admin)..."
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:fixtures:load --no-interaction --append
	@echo "✅ Admin créé : admin@admin.com / admin"

reset-data: ## Recrée toutes les données (supprime tout et recharge les fixtures)
	@echo "🗑️ Suppression de toutes les données..."
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:fixtures:load --no-interaction
	@echo "✅ Données rechargées avec admin par défaut"

list-users: ## Liste tous les utilisateurs
	@echo "👥 Liste des utilisateurs :"
	@ddev mysql -e "SELECT id, email, roles FROM user;"

## —— 🗃️ Base de données ————————————————————————————————————————————————
db-info: ## Affiche les informations de connexion DB
	@echo "📊 Informations de connexion :"
	@echo "Host: 127.0.0.1"
	@echo "Port: 3307"
	@echo "Database: db"
	@echo "Username: db"
	@echo "Password: db"
	@ddev describe | grep "db:3306"

db-create: ## Crée la base de données
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:database:create --if-not-exists

db-drop: ## Supprime la base de données
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:database:drop --force --if-exists

db-reset: ## Recrée la base de données complètement
	@make db-drop
	@make db-create
	@make migrate

db-init: ## Initialise la base de données (crée la DB et les tables)
	@make db-create
	@make migrate
	@echo "✅ Base de données initialisée avec succès !"

migration: ## Génère une migration
	ddev exec --dir $(API_FOLDER) php bin/console make:migration

migrate: ## Exécute les migrations
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:migrations:migrate -n

migration-create: ## Crée une nouvelle migration (ex: make migration-create NAME="add_user_table")
ifndef NAME
	@echo "❌ Spécifiez le nom avec NAME=..."
	@echo "💡 Exemple : make migration-create NAME=\"add_user_table\""
	@exit 1
endif
	ddev exec --dir $(API_FOLDER) php bin/console make:migration --name=$(NAME)

migration-status: ## Affiche le statut des migrations
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:migrations:status

migration-list: ## Liste toutes les migrations disponibles
	ddev exec --dir $(API_FOLDER) php bin/console doctrine:migrations:list

## —— 📦 Installation ————————————————————————————————————————————————————
install: ## Installation complète du projet
	#ddev start
	ddev composer install --working-dir=backend
	ddev exec --dir $(WEBAPP_FOLDER) npm install
	@echo "✅ Installation terminée !"
	@echo "🔗 API Symfony: https://$(PROJECT_NAME).ddev.site"
	@echo "🔗 Frontend Vue: https://app.$(PROJECT_NAME).ddev.site"

install-webapp: ## Installation complète du front
	#ddev start
	#ddev composer install --working-dir=backend
	ddev exec --dir $(WEBAPP_FOLDER) npm install
	@echo "✅ Installation terminée !"
	@echo "🔗 Frontend Vue: https://app.$(PROJECT_NAME).ddev.site"

## —— 🛠️ Outils ——————————————————————————————————————————————————————————
ssh: ## Shell dans le conteneur principal
	ddev ssh

backend: ## Exécute une commande dans le backend (ex: make backend CMD="composer install")
ifndef CMD
	@echo "❌ Spécifiez la commande avec CMD=..."
	@echo "💡 Exemples :"
	@echo "   make backend CMD=\"composer install\""
	@echo "   make backend CMD=\"php bin/console cache:clear\""
	@echo "   make backend CMD=\"composer show | grep doctrine\""
	@echo "   make backend CMD=\"php bin/console make:entity User\""
	@exit 1
endif
	ddev exec --dir $(API_FOLDER) $(CMD)

webapp: ## Exécute une commande dans le webapp (ex: make webapp CMD="npm install")
ifndef CMD
	@echo "❌ Spécifiez la commande avec CMD=..."
	@echo "💡 Exemples :"
	@echo "   make webapp CMD=\"npm install\""
	@echo "   make webapp CMD=\"npm run dev\""
	@echo "   make webapp CMD=\"npm run build\""
	@echo "   make webapp CMD=\"npm run lint\""
	@exit 1
endif
	ddev exec --dir $(WEBAPP_FOLDER) $(CMD)

backend-shell: ## Ouvre un shell dans le dossier backend
	ddev exec --dir $(API_FOLDER) bash

webapp-shell: ## Ouvre un shell dans le dossier webapp
	ddev exec --dir $(WEBAPP_FOLDER) bash

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
