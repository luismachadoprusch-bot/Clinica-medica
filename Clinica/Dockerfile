# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o projeto
COPY . .

# Cria build da aplicação
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copia os arquivos build para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia config customizada (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe porta
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
