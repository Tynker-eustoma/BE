FROM node:16.18.0

ENV PORT=3000
ENV JWT_SECRET=INI_SECRET
ENV DATABASE_URL=postgresql://postgres:SofDikWahMel123@db.qfjyoixytgrcioowobtr.supabase.co:5432/postgres

WORKDIR /BACKEND

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD node app