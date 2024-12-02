# Use uma imagem Node.js para construir e rodar o Angular
FROM node:20

# Configurar o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY package*.json ./
RUN npm install
COPY . .

# Expor a porta do frontend
EXPOSE 4200

# Iniciar o servidor de desenvolvimento do Angular
CMD ["npm", "start"]