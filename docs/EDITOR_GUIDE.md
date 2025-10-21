# School Newspaper Editor's Guide

Welcome to the School Newspaper website! This guide explains how to publish articles without needing any technical knowledge. Everything is done through Google Docs and Google Sheets.

## Overview

The system works like this:

1. **You write articles** in Google Docs
2. **You add metadata** in a Google Sheet (title, author, date, category, etc.)
3. **The website automatically displays** your articles

That's it! No coding required.

---

## Step 1: Understanding the Structure

### Google Drive Folder Organization

Your articles are organized in Google Drive like this:

```
School Newspaper Articles/
├── Campus News/
├── Sports & Activities/
├── Arts & Culture/
├── Opinion/
├── Student Life/
└── Student Profiles/
```

**You don't have to use these folders**, but organizing by category makes it easier to keep track of things.

### Master Google Sheet

There's a Google Sheet called **"School Newspaper Articles"** that lists all your articles. Think of it as the "control center" for your newspaper.

---

## Step 2: Writing Your First Article

### Option A: Writing in Google Docs (Recommended)

1. **Create a new Google Doc**
   - Go to [Google Docs](https://docs.google.com/document)
   - Click "+ New" → "Document"
   - Give it a title (this will be your article title)

2. **Write your article**
   - Write the article content as you normally would
   - Use formatting: **bold**, *italics*, lists, headings, etc.
   - All of this will be preserved when displayed on the website

3. **Save it to a category folder** (optional but helpful)
   - Click "Move" (in Google Docs)
   - Select the appropriate folder (Sports, Arts, etc.)

### Option B: Pasting from Word/Google Docs

If you've already written your article elsewhere:
1. Copy your text
2. Open a new Google Doc
3. Paste your content
4. Follow steps 2-3 above

---

## Step 3: Get Your Article's Google Doc ID

Every Google Doc has a unique ID that helps the website find it.

**How to find it:**

1. Open your Google Doc
2. Look at the URL in your browser address bar
3. Find the part that looks like: `https://docs.google.com/document/d/**1ABC2def3GHI4jkl**5/edit`
4. **Copy the long string between `/d/` and `/edit`** (in this example: `1ABC2def3GHI4jkl5`)

**Save this ID somewhere** - you'll need it in the next step.

---

## Step 4: Add Your Article to the Master Sheet

Now you'll tell the website about your article by adding it to the master spreadsheet.

1. **Open the "School Newspaper Articles" Google Sheet**
   - Your editor-in-chief should give you access to this

2. **Click on the next empty row** at the bottom

3. **Fill in each column:**

   | Column | What to enter | Example |
   |--------|---------------|---------|
   | **A: Title** | Your article title | "New Sports Facility Opens" |
   | **B: Author** | Your name | "John Smith" |
   | **C: Category** | Section type | "Sports" (must match the folders) |
   | **D: Date** | When it was written | "2024-10-21" (YYYY-MM-DD format) |
   | **E: Google Doc ID** | The ID from Step 3 | "1ABC2def3GHI4jkl5" |
   | **F: Featured** | Is this the main story? | "TRUE" or "FALSE" |
   | **G: Excerpt** | 1-2 sentence summary | "The new gym facility is now open..." |
   | **H: Image URL** | Link to an image | "https://example.com/image.jpg" |

### Example Row:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| New Sports Facility Opens | John Smith | Sports | 2024-10-21 | 1ABC2def3GHI4jkl | TRUE | The new gym facility is now open and ready for use. | https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop |

---

## Step 5: Add an Image to Your Article

The website shows a thumbnail image for each article in the grid. You'll need to provide a URL to an image.

### Option A: Use an Image You Uploaded to Google Drive

1. Upload an image to Google Drive (in your article folder if possible)
2. Right-click it → "Get link"
3. Make sure "Anyone with the link" can view it
4. Copy the link
5. Paste it in the "Image URL" column

### Option B: Use a Free Stock Photo

You can use any free stock photo service:

- **Unsplash** (https://unsplash.com) - Best for high-quality news photos
- **Pexels** (https://pexels.com) - Good variety
- **Pixabay** (https://pixabay.com) - Lots of free images

Steps:
1. Search for a relevant image
2. Download it OR right-click → "Copy image link"
3. Use that URL in the "Image URL" column

### Example Image URLs:
```
https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop
https://images.pexels.com/photos/3823517/pexels-photo-3823517.jpeg
```

---

## Step 6: Verify Your Article Appears

After adding your article to the Google Sheet:

1. **Wait 1 hour** - The website updates every hour
   - OR manually refresh (developer can clear cache immediately)

2. **Visit the website** and look for your article

3. **If it doesn't appear:**
   - Check the browser console (F12) for error messages
   - Verify all columns in the spreadsheet have values
   - Make sure the Google Doc ID is correct
   - Make sure the sheet has been shared (your editor should do this)

---

## Managing Your Articles

### Editing an Article

1. Open the Google Doc
2. Make your changes
3. The website will show the updated version automatically (within 1 hour)

### Featuring an Article

To make an article the main featured story:

1. Open the "School Newspaper Articles" spreadsheet
2. Find your article row
3. Change the "Featured" column (F) to **TRUE**
4. All other articles should have **FALSE**

Only one article can be featured at a time. The most recent featured article will be the main story.

### Removing an Article

1. Open the "School Newspaper Articles" spreadsheet
2. Find your article row
3. Delete the entire row
4. The article will disappear from the website within 1 hour

### Changing the Category

1. Open the "School Newspaper Articles" spreadsheet
2. Find your article row
3. Change the "Category" column (C) to a new category
4. The website will show it in the new section

**Valid categories** (must match exactly):
- Campus News
- Sports & Activities
- Arts & Culture
- Opinion
- Student Life
- Student Profiles

---

## Tips for Success

### ✅ DO:
- **Write clear headlines** - They should tell readers what the story is about
- **Include a good excerpt** - 1-2 sentences that make people want to read more
- **Use good images** - Clear, relevant photos that match your story
- **Check your formatting** - Bold important parts, use headings for organization
- **Organize Google Docs by folder** - Makes it easier to find articles
- **Double-check dates** - Use YYYY-MM-DD format (e.g., 2024-10-21)
- **Test your links** - Before publishing, verify the image URL works

### ❌ DON'T:
- **Leave any columns blank** - All fields are required
- **Copy long text into the excerpt** - Keep it to 1-2 sentences
- **Use broken image links** - Always test them first
- **Feature too many articles** - Only one can be featured at a time
- **Forget to save your Google Doc** - Changes should be auto-saved
- **Use special characters in categories** - Keep them simple

---

## Frequently Asked Questions

### Q: How do I change the website name or colors?
**A:** That requires developer access. Talk to your site maintainer.

### Q: Can I write directly in the Google Sheet?
**A:** No - the website reads from Google Docs. You must write in Docs.

### Q: What if I make a typo in the master sheet?
**A:** Just edit the cell. The website will update within 1 hour.

### Q: Can multiple people write articles at the same time?
**A:** Yes! Each writer creates their own Google Doc. Multiple articles can be published simultaneously.

### Q: How long does it take for articles to appear?
**A:** Usually within 1 hour. Sometimes immediately. Contact your developer if it's been longer.

### Q: Can I see analytics about article performance?
**A:** Not yet, but that feature can be added. Ask your developer.

### Q: What if my image doesn't show up?
**A:** Make sure:
1. The URL is public and starts with `https://`
2. It's not a broken link
3. The image file actually exists
4. Wait 1 hour for the cache to refresh

### Q: Can I schedule articles to publish later?
**A:** Not yet in the current system. Articles publish immediately when added to the sheet.

### Q: What happens when I graduate?
**A:** The documentation is saved and the next newspaper team can take over. Everything is preserved in Google Drive.

---

## Getting Help

If something isn't working:

1. **Check this guide** - Most issues are covered here
2. **Check the browser console** (F12 → Console) for error messages
3. **Ask your editor-in-chief** - They might have already solved the problem
4. **Contact the developer** - They can check server logs and help debug

---

## Quick Checklist Before Publishing

Before hitting "save" on your article metadata:

- [ ] Google Doc is written and formatted
- [ ] Google Doc ID is copied correctly
- [ ] Title is filled in
- [ ] Author is filled in
- [ ] Category matches one of the valid categories
- [ ] Date is in YYYY-MM-DD format
- [ ] Excerpt is 1-2 sentences
- [ ] Image URL is tested and works
- [ ] Featured status is set (TRUE or FALSE)

---

**You're ready!** Start writing great stories for your school newspaper! 📰

