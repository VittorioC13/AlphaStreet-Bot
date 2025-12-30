# Pre-Testing Checklist - AlphaStreet Bot Migration

## ✅ Migration Verification

### Files Migrated
- [x] Backend API (index.py, chat_module.py)
- [x] All 23 HTML templates
- [x] 136MB of static assets
- [x] Supporting files (requirements.txt, vercel.json, docs)
- [x] Generator utilities

### Branding Updates
- [x] Text: "TMT Bot" → "AlphaStreet Bot" (80+ instances)
- [x] Colors: Warm earth tones → Professional blue palette
- [x] CSS variables updated in tmt.css
- [x] Tailwind config colors updated in all templates
- [x] Background SVG colors updated
- [x] Button/gradient colors updated

### Documentation
- [x] README.md created for AlphaStreet-Bot
- [x] CHAT_INTEGRATION_README.md updated
- [x] MIGRATION_SUMMARY.md created
- [x] CLAUDE.md created
- [x] README_TMTBOT.md preserved as reference

### File Naming
- [x] Verified: TMT_Brief_*.pdf files are SECTOR-SPECIFIC (not branding)
- [x] Verified: tmt.css renamed conceptually (AlphaStreet branding applied)
- [x] No user-facing files with TMT branding

### Image/Logo Files
- [x] Checked: No TMT-branded logos found
- [x] Bank logos are third-party (correct)
- [x] Favicon.ico present (generic)

### Infrastructure Preserved
- [x] MongoDB connection (shared tmtbot database)
- [x] PostgreSQL configuration
- [x] Environment variable structure
- [x] API endpoint structure
- [x] TMT sector references (industry term)

## ⚠️ Known Items

### Intentionally Preserved
1. **MongoDB database name**: `tmtbot` - Shared infrastructure
2. **TMT sector references**: Industry standard term
3. **README_TMTBOT.md**: Kept as reference
4. **demo_AlphaStreet/**: Preserved but not used in production
5. **api_backup/**: Backup of original minimal API

### File Names with "TMT"
- All `*_TMT_Brief_*.pdf` files: These refer to TMT industry sector ✓
- `tmt.css`: Rebranded internally, filename kept for compatibility ✓
- `TMT_DECK.pdf`: Sector-specific deck ✓

## 🔍 Final Verification Results

- **TMT Bot/BOT references in code**: 0 (excluding sectors & infrastructure)
- **AlphaStreet Bot/BOT references**: 80+
- **HTML templates rebranded**: 23/23
- **CSS files rebranded**: 2/2 (styles.css, tmt.css)
- **Documentation updated**: 5/5

## 📋 Pre-Testing Steps

Before running the application:

### 1. Environment Setup
- [ ] Create `.env` file with required variables
- [ ] Set DATABASE_URL (PostgreSQL)
- [ ] Set MONGODB_URI
- [ ] Set MONGO_DB_NAME
- [ ] (Optional) Set OPENAI_API_KEY for full AI features
- [ ] Set FLASK_SECRET_KEY

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Database Verification
- [ ] Confirm PostgreSQL database is accessible
- [ ] Confirm MongoDB database is accessible
- [ ] (Optional) Initialize database tables if needed

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Landing page loads with AlphaStreet branding
- [ ] Color scheme is blue (not terracotta/kraft)
- [ ] "AlphaStreet Bot" appears in header/title
- [ ] No "TMT Bot" references visible on any page

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Session management works
- [ ] Logout works

### Dashboard
- [ ] Dashboard loads for logged-in users
- [ ] Sector cards display correctly
- [ ] AlphaStreet branding throughout
- [ ] Premium access controls work

### Chat
- [ ] Chat interface loads
- [ ] Demo mode works (without API key)
- [ ] Messages send and receive
- [ ] Conversation history works

### Reports & Briefs
- [ ] PDF viewer loads
- [ ] Sector-specific briefs accessible
- [ ] Deal collection pages work
- [ ] TLDR section works

### Visual Verification
- [ ] Blue color scheme throughout
- [ ] No warm earth tones (terracotta/kraft/manila)
- [ ] Background SVG is light blue
- [ ] Buttons use blue gradients
- [ ] All text shows "AlphaStreet"

## ✅ Migration Status

**Status**: Ready for Testing  
**Confidence Level**: High  
**Blockers**: None identified  
**Next Step**: Install dependencies and run local test

---

**Notes**:
- All branding changes completed
- Documentation comprehensive
- Infrastructure preserved correctly
- Ready for local testing before GitHub push
