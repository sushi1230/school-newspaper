# Google OAuth 2.0 Setup for School Email Authentication

This guide sets up Google Sign-In that **only allows @pps.net school email addresses** to log in.

---

## Overview

This is different from the Google Sheets API setup. This is for user **authentication** (login).

**What it does:**
- Users click "Sign in with Google"
- They must use their @pps.net school email
- Their role (Admin/Editor/Writer) is determined from the "Users" sheet
- They're redirected to the appropriate dashboard

---

## Step 1: Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your "School Newspaper" project (created in GOOGLE_API_SETUP.md)
3. Go to **APIs & Services** → **Credentials**

### Create OAuth 2.0 Client ID

1. Click **+ CREATE CREDENTIALS**
2. Select **OAuth 2.0 Client IDs**
3. If prompted, configure OAuth consent screen first:
   - User type: External
   - Fill in app name: "School Newspaper"
   - Add your school email
   - Add scopes: `email` and `profile`
   - Add yourself as test user
   - Click Save

4. Back to Credentials, click **+ CREATE CREDENTIALS** again
5. Choose **OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Name it: "School Newspaper Web"
8. Add **Authorized redirect URIs**:
   ```
   http://localhost:5173
   http://localhost:3000
   https://your-vercel-domain.vercel.app
   https://your-netlify-domain.netlify.app
   https://yourdomain.com
   ```
   (Add all the domains where your site will be deployed)

9. Click **Create**
10. **Copy the Client ID** - you'll need it in the next step

---

## Step 2: Configure Environment Variables

Add the OAuth Client ID to your `.env.local`:

```
# .env.local

# Existing variables...
VITE_GOOGLE_API_KEY=your_api_key
VITE_GOOGLE_SHEETS_ID=your_sheets_id
VITE_GOOGLE_DRIVE_FOLDER_ID=your_folder_id

# NEW: Google OAuth 2.0
VITE_GOOGLE_OAUTH_CLIENT_ID=your_oauth_client_id_here

# School email domain
VITE_ALLOWED_EMAIL_DOMAIN=pps.net

# Admin email
VITE_ADMIN_EMAIL=hkaplanminer@pps.net
```

Also update `.env.example` to show the format (without actual values):

```
# .env.example
VITE_GOOGLE_OAUTH_CLIENT_ID=your_oauth_client_id_from_google_cloud
VITE_ALLOWED_EMAIL_DOMAIN=pps.net
VITE_ADMIN_EMAIL=teacher_email@pps.net
```

---

## Step 3: Create Users Management Sheet

In your master Google Sheet ("School Newspaper Articles"), **create a new sheet called "Users"**.

### Column Headers:

```
A: Email
B: Name
C: Role
D: Approved
E: Join Date
```

### Example Rows:

| Email | Name | Role | Approved | Join Date |
|-------|------|------|----------|-----------|
| hkaplanminer@pps.net | Mrs. Kaplan | Admin | TRUE | 2024-10-01 |
| john.smith@pps.net | John Smith | Editor | TRUE | 2024-10-15 |
| sarah.jones@pps.net | Sarah Jones | Writer | TRUE | 2024-10-15 |
| mike.davis@pps.net | Mike Davis | Writer | FALSE | 2024-10-20 |

### Role Definitions:

- **Admin**: Full system control (only hkaplanminer@pps.net initially)
- **Editor**: Can review/approve submissions, publish, manage content
- **Writer**: Can write articles and submit for approval
- **Viewer**: Can only view public pages (default if not in Users sheet)

### Approved Column:

- **TRUE**: User can log in
- **FALSE**: User is blocked from login

---

## Step 4: Share the Users Sheet

Your website needs to read the Users sheet to determine roles:

1. **Share your master spreadsheet** (already done from GOOGLE_API_SETUP.md)
2. The website will automatically read the "Users" sheet tab
3. Users' roles are checked every time they log in

---

## How User Roles Work

### On First Login:

1. User clicks "Sign in with Google"
2. They authenticate with their @pps.net email
3. Website checks Users sheet:
   - Is their email in the sheet?
   - Is Approved = TRUE?
   - What's their Role?

### Login Outcomes:

**Case 1: User in sheet, approved, has role**
- ✅ Login succeeds
- Redirected to dashboard for their role

**Case 2: User in sheet, but Approved = FALSE**
- ❌ Login fails
- Message: "Your account is pending approval"

**Case 3: User in sheet, Approved = TRUE, but no role**
- ✅ Login succeeds
- Redirected as Viewer (can only see public pages)

**Case 4: User NOT in sheet**
- ❌ Login fails (optional: could allow self-signup)
- Message: "Your email must be added by an admin"

**Case 5: User has wrong email domain** (not @pps.net)
- ❌ Login fails immediately
- Message: "Must use school email (@pps.net)"

---

## Step 5: Test Locally

1. **Update `.env.local`** with OAuth Client ID
2. **Start dev server**:
   ```bash
   npm run dev
   ```
3. **Go to `http://localhost:5173`**
4. **Click "Sign in with Google"**
5. Choose your @pps.net account
6. Should redirect to your role's dashboard

### Troubleshooting Local Testing:

**"Redirect URI mismatch" error:**
- Make sure `http://localhost:5173` is in your OAuth authorized URIs

**"Invalid origin" error:**
- Your OAuth configuration might not allow localhost
- Add `http://localhost:5173` to authorized URIs

**Login works but shows "Not authorized":**
- Your email might not be in the Users sheet
- Add yourself to Users sheet with Role=Admin, Approved=TRUE

---

## Managing Users

### Adding a New Editor

1. Open the "Users" sheet in your master spreadsheet
2. Add a new row:
   - Email: `firstname.lastname@pps.net`
   - Name: Their full name
   - Role: `Editor`
   - Approved: `TRUE`
   - Join Date: Today's date
3. They can now log in

### Blocking a User

1. Find their row in Users sheet
2. Change `Approved` from TRUE to FALSE
3. They'll be blocked on next login attempt

### Changing a User's Role

1. Find their row
2. Change `Role` column to new role
3. Changes take effect on next login

### Removing a User

Delete their row from the Users sheet (they won't be able to log in)

---

## Admin Account Setup

### Initial Admin Setup:

1. Make sure your email is in Users sheet:
   ```
   hkaplanminer@pps.net | Your Name | Admin | TRUE | Today
   ```

2. You'll have full access to:
   - Admin dashboard
   - User management
   - Site settings
   - Content override
   - System logs

### Adding More Admins (Optional):

1. Add another teacher/staff email to Users sheet
2. Set Role to `Admin`
3. They'll have same permissions as you

---

## Security Considerations

### ✅ DO:

- Keep OAuth Client ID in `.env.local` (not committed to GitHub)
- Only add @pps.net emails to Users sheet
- Require Approved=TRUE before users can login
- Use Admin role sparingly
- Regularly review Users sheet for unauthorized entries

### ❌ DON'T:

- Share your OAuth Client ID publicly
- Allow non-school emails in Users sheet
- Commit `.env.local` to GitHub
- Approve users without checking they're real staff/students
- Give everyone Admin role

---

## Refreshing User Roles

User roles are checked every time they:
- Log in
- Refresh the page
- Session expires and they re-authenticate

**If you change a user's role in the spreadsheet, they need to refresh the page to see the change.**

---

## Troubleshooting

### "Unexpected parameter: nonce" Error

- Update `.env.local` with correct OAuth Client ID
- Clear browser cache and cookies
- Try logging in again

### User can't log in but email is in Users sheet

1. Check Approved column = TRUE
2. Check email is spelled correctly
3. Check email ends with @pps.net (case-sensitive domain)
4. Have them clear cache and try again

### "Invalid_grant" Error

- User's session might be expired
- They should log out and back in
- Check your OAuth credentials haven't changed

### User sees wrong dashboard

- Their role in Users sheet might be wrong
- Have them log out and back in
- Check that role is one of: Admin, Editor, Writer, Viewer

---

## Next Steps

1. ✅ Get OAuth Client ID from Google Cloud
2. ✅ Add to `.env.local`
3. ✅ Create Users sheet
4. ✅ Add yourself as Admin
5. ✅ Test login locally
6. ✅ Deploy to production
7. ✅ Start adding other users

---

## Differences from Google Sheets API

| | **Sheets API** (Reading Articles) | **OAuth 2.0** (Login) |
|---|---|---|
| Purpose | Read article content | User authentication |
| Setup | API Key | OAuth Client ID |
| Use | Fetch data from sheets | Login with Google |
| Refresh | Every hour via cache | Every time user logs in |
| Security | Public read-only | Private per-user |

**You need BOTH for the full system to work.**

---

Questions? See the main README or ask your developer.

