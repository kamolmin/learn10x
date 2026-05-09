# Learn 10X Faster — Setup Guide
## GitHub: kamolmin/learn10x → Vercel → Live

---

## STEP 1 — Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: **learn10x**
3. Set to **Public**
4. Do NOT check "Add README"
5. Click **Create repository**

---

## STEP 2 — Upload the Project Files

On your computer, open Terminal (Mac) or Command Prompt (Windows):

```bash
# Navigate to where you saved the learn10x folder
cd path/to/learn10x

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit — Learn 10X Faster MVP"

# Connect to GitHub (replace kamolmin if needed)
git remote add origin https://github.com/kamolmin/learn10x.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## STEP 3 — Deploy to Vercel

1. Go to https://vercel.com
2. Click **Add New Project**
3. Click **Import Git Repository**
4. Find **kamolmin/learn10x** and click **Import**
5. Vercel will auto-detect React — leave all settings as default
6. Click **Deploy**
7. Wait ~2 minutes

✅ Your app will be live at: **https://learn10x.vercel.app**

---

## STEP 4 — Test the Live App

Open the URL and login with:

| Role | Username | Password |
|------|----------|----------|
| Teacher (Mamirjon) | `teacher` | `1234` |
| Student | `student` | `1234` |

---

## What Mamirjon Will See

**As Teacher:**
- Dashboard with all 6 students
- Certificate levels A→I for each student
- Status: On Track / At Risk / Behind
- Click any student → full profile
- Click Test → start a live timed test

**As Student:**
- Take a real timed test
- See score and feedback immediately

---

## Future Updates

Every time you want to update the app:
```bash
git add .
git commit -m "Update description"
git push
```
Vercel auto-deploys within 1 minute. 🚀
