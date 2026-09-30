# Adedayo portfolio
1. `npm install` then copy `.env.example` to `.env.local` and set ADMIN_PASSWORD and ADMIN_SECRET.
2. Run `npm run dev` and open `/admin` to edit projects, services, toolkit, ticker and hero tags. Changes appear on the site immediately.
## Storage
- Local/VPS: saves to `content/site.json` automatically.
- Vercel/Netlify (disk is read-only): use Supabase. Run once in the SQL editor:
  `create table site_content (id text primary key, data jsonb not null);`
  then set SUPABASE_URL and SUPABASE_SERVICE_KEY (service role key, server only) in your host's environment variables. Keep RLS enabled with no public policies; only the server touches this table.
## Contact form
Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) to send requests.
## Image uploads
Vercel: in Supabase go to Storage, New bucket, name it `portfolio`, and turn Public on. Local: images save to `public/uploads`.
