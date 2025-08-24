# Personal GitHub Pages Site - Customization Guide

## Welcome to Your Academic Portfolio!

This site has been set up as a foundation for your personal GitHub Pages website using the al-folio template. Below you'll find instructions on how to customize it with your personal information.

## Quick Start - Essential Customizations

### 1. Personal Information (`_config.yml`)
- **Lines 5-8**: Update your name
- **Line 21**: Confirm your GitHub Pages URL
- **Lines 11-13**: Update the site description

### 2. About Page (`_pages/about.md`)
- **Line 5**: Update your subtitle with your actual affiliation/title
- **Lines 12-14**: Update your contact information
- **Lines 30-35**: Replace the biography with your own story

### 3. Social Media Links (`_data/socials.yml`)
- **Line 10**: Update your email address
- **Line 13**: Update your GitHub username (already set to xzAscC)
- **Line 24**: Add your LinkedIn username
- Uncomment and fill in other social media profiles as needed

### 4. CV Information (`_data/cv.yml`)
Replace all placeholder text with your actual information:
- Education details
- Work experience
- Projects
- Awards and honors
- Interests

### 5. Resume JSON (`assets/json/resume.json`)
Update all sections with your personal information:
- Basic contact info
- Work experience
- Education
- Skills
- Projects

## Profile Picture
- Add your profile picture as `assets/img/prof_pic.jpg`
- The template is already configured to use this filename

## Advanced Customizations

### Adding Your Publications
- Edit `_bibliography/papers.bib` to add your publications
- Publications will automatically appear on the publications page

### Customizing Projects
- Add markdown files to `_projects/` folder
- Each project should have appropriate front matter

### Blog Posts
- Add new blog posts to `_posts/` folder
- Follow the naming convention: `YYYY-MM-DD-title.md`

### News/Announcements
- Add news items to `_news/` folder

## Testing Locally

1. Install Ruby and Jekyll dependencies:
   ```bash
   bundle install
   ```

2. Run the site locally:
   ```bash
   bundle exec jekyll serve
   ```

3. Open `http://localhost:4000` in your browser

## Deploying to GitHub Pages

1. Ensure your repository is named `[username].github.io`
2. Push your changes to the `main` branch
3. Go to repository Settings > Pages
4. Set source to "Deploy from a branch" and select `main` branch
5. Your site will be available at `https://[username].github.io`

## Important Files to Customize

| File | Purpose |
|------|---------|
| `_config.yml` | Main site configuration |
| `_pages/about.md` | Homepage content |
| `_data/socials.yml` | Social media links |
| `_data/cv.yml` | CV/Resume data |
| `assets/json/resume.json` | JSON resume format |
| `assets/img/prof_pic.jpg` | Your profile picture |

## Next Steps

1. Replace all placeholder text with your actual information
2. Add your profile picture
3. Test the site locally
4. Deploy to GitHub Pages
5. Gradually add your projects, publications, and blog posts

For more detailed customization options, check the [al-folio documentation](https://github.com/alshedivat/al-folio). 