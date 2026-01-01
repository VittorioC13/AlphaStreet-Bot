# TMTBot to AlphaStreet-Bot Migration Guide

## Project Overview

This document tracks the migration of TMTBot's complete functionality to AlphaStreet-Bot, maintaining the same backend services and business logic while applying AlphaStreet-specific branding.

**Date Started:** December 30, 2024
**Migration Type:** Full backend + frontend copy with rebranding
**Status:** In Progress

---

## Repository Information

- **Source Repository:** https://github.com/VittorioC13/tmtbot
- **Destination Repository:** https://github.com/VittorioC13/AlphaStreet-Bot
- **Local Path:** `/home/fruitmeister/bot-migration/`

---

## Architecture Overview

### TMTBot (Source)
- **Backend:** Python Flask application
- **Main Backend File:** `api/index.py` (80KB - complete implementation)
- **Chat Module:** `api/chat_module.py`
- **Frontend:** Traditional Flask templates + static assets
  - Templates: `api/templates/` (23 HTML files)
  - Static Assets: `api/static/` (CSS, fonts, data, images, briefs, research, deals, exhibits, TLDR, etc.)
- **Database:** MongoDB + PostgreSQL (via SQLAlchemy)
- **Deployment:** Vercel (vercel.json config)

### AlphaStreet-Bot (Destination - Before Migration)
- **Current State:**
  - Minimal `api/app.py` (175 lines, partial Flask implementation with auth only)
  - `AlphaStreet/` folder: Simple static index.html with branding + PDFs
  - `demo_AlphaStreet/` folder: TypeScript/React/Vite project (NOT being used for final product)

### AlphaStreet-Bot (Destination - After Migration)
- **Backend:** Complete Python Flask application (copied from TMTBot)
- **Frontend:** TMTBot's Flask templates + static assets with AlphaStreet branding applied
- **Services:** Same backend services, database, and AI models as TMTBot

---

## Branding Changes Identified

### TMTBot Brand (Original)
- **Name:** "TMT Bot" / "TMT BOT"
- **Tagline:** "Market Intelligence Collection"
- **Color Scheme:** Warm earth tones
  - Primary: Terracotta `#CC786C`
  - Secondary: Kraft `#D4A37F`
  - Tertiary: Manila `#EBDBBC`
  - Background: Ivory `#FAFAF7`
  - Text: Slate `#101010` (black)
  - Background SVG accent: `#D4A37F` (kraft)
- **Visual Style:** Warm, earthy, terracotta-inspired

### AlphaStreet Brand (Target)
- **Name:** "AlphaStreet Bot" / "AlphaStreet BOT"
- **Tagline:** "Market Intelligence Collection" (same)
- **Color Scheme:** Cool blue tones
  - Primary: `#187ABA` (professional blue)
  - Secondary: `#4695C8` (light blue)
  - Tertiary: `#A3CAE3` (pale blue)
  - Background: `#F3F6FA` (light blue-grey) / `#F5F7FA`
  - Text: `#0C2740` / `#002B51` (dark navy blue)
  - Accent: Teal `#3BA4D5`, Cyan `#5FC6E4`, Lavender `#6E80D8`, Periwinkle `#8A9EEE`
  - Button Primary: `#1D7EB6`
  - Button Hover: `#155F89`
  - Premium Brass: `#C4A46A`
  - Background SVG accent: `#A3CAE3` (pale blue)
- **Visual Style:** Professional, modern, financial/corporate blue palette

---

## Migration Strategy

### Phase 1: Backend Migration ✓
1. **Copy TMTBot `api/` folder** → Replace AlphaStreet-Bot's minimal `api/` folder
   - `index.py` (main Flask app with all routes)
   - `chat_module.py` (AI chat functionality)
   - `templates/` (all 23 HTML templates)
   - `static/` (all assets, CSS, fonts, data)
   - `term_definitions.json` (data file)
   - `README.md` (API documentation)

2. **Copy supporting files**
   - `requirements.txt` (Python dependencies)
   - `requirements_generator.txt` (Generator dependencies)
   - `vercel.json` (deployment config)
   - `.vercelignore`
   - Documentation files:
     - `CHAT_INTEGRATION_README.md`
     - `MAP_SETUP.md`
     - `SQL_QUERIES.md`
     - `WEBHOOK_SETUP.md`
     - `README.md`

3. **Copy Generator folder** (if needed)

### Phase 2: Branding Application 🔄
Apply AlphaStreet branding to all copied frontend files:

#### Text Replacements
- `"TMT Bot"` → `"AlphaStreet Bot"`
- `"TMT BOT"` → `"AlphaStreet BOT"`
- `"TMT DECK"` → Keep sector names as-is (TMT, Energy, Healthcare, etc.)
- Any references to "TMTBot" → "AlphaStreet-Bot"

#### Color Replacements in HTML/CSS
**Tailwind Config Colors** (in `<script>` tags):
- `'anthropic-terracotta': '#CC786C'` → `'anthropic-terracotta': '#187ABA'`
- `'anthropic-kraft': '#D4A37F'` → `'anthropic-kraft': '#4695C8'`
- `'anthropic-manila': '#EBDBBC'` → `'anthropic-manila': '#A3CAE3'`
- `'anthropic-ivory': '#FAFAF7'` → `'anthropic-ivory': '#F3F6FA'`
- `'anthropic-slate': '#101010'` → `'anthropic-slate': '#0C2740'`
- `'anthropic-cloud-dark': '#666663'` → `'anthropic-cloud-dark': '#4B6483'`
- `'anthropic-cloud-medium': '#99918D'` → `'anthropic-cloud-medium': '#8095AD'`
- `'anthropic-cloud-light': '#BFBFBA'` → `'anthropic-cloud-light': '#99B5D4'`
- `'anthropic-ivory-dark': '#E4E4DF'` → `'anthropic-ivory-dark': '#E6EEF6'`

**Additional AlphaStreet Colors to Add:**
```javascript
'accent-teal': '#3BA4D5',
'accent-cyan': '#5FC6E4',
'accent-lavender': '#6E80D8',
'accent-periwinkle': '#8A9EEE',
'button-primary': '#1D7EB6',
'button-hover': '#155F89',
'icon-teal': '#4FB5D9',
'icon-lavender': '#8AA4E8',
'premium-brass': '#C4A46A'
```

**Background Styles:**
- `background: #FAFAF7` → `background: #F5F7FA`
- `color: #101010` → `color: #002B51`
- SVG background stroke color: `%23D4A37F` → `%23A3CAE3`

**CSS File Changes** (`static/styles.css`):
- Update any hardcoded colors from TMT palette to AlphaStreet palette
- Search for hex colors and gradient values

#### Files to Update
**All HTML files in `api/templates/`:**
- `index.html` ⭐ (main landing page - highest priority)
- `dashboard.html` ⭐ (user dashboard)
- `chat.html` ⭐ (AI chat interface)
- `deal_collection.html` (deal analysis page)
- `reports.html` (reports viewing)
- `login.html` (login page)
- `register.html` (registration page)
- `pricing.html` (pricing/subscription)
- `payment.html` (payment processing)
- `features.html` (features page)
- `mission.html` (about/mission page)
- `contacts.html` (contact page)
- `map.html` (map visualization)
- `client_index.html` (client portal)
- `ai_chat_select.html` (AI chat selection)
- `LLM_Chat_Demo.html` (LLM demo)
- `LLM_Pitch_Demo.html` (pitch demo)
- `LLM_chat.html` (LLM chat)
- `sample.html`
- `renderTest.html`
- `brief_not_ready.html` (error page)
- `404.html` (error page)
- `500.html` (error page)

**CSS Files:**
- `api/static/styles.css` (main stylesheet - 24KB)
- Any other CSS files in `api/static/css/`

### Phase 3: Backend Configuration 🔄
Check and update backend configurations if needed:
- Environment variables (`.env` handling)
- Database connection strings (if any hardcoded)
- API keys and secrets (ensure they're from AlphaStreet config)
- File paths and asset references

### Phase 4: Testing & Verification ⏳
- [ ] Backend starts successfully
- [ ] All routes respond correctly
- [ ] Chat functionality works
- [ ] Database connections work
- [ ] Frontend displays with correct AlphaStreet branding
- [ ] All sector pages load correctly
- [ ] Authentication flow works
- [ ] Payment/subscription features work

---

## Files & Folders to Preserve

**DO NOT DELETE from AlphaStreet-Bot:**
- `.git/` (Git repository)
- `AlphaStreet/static/pdfs/` (AlphaStreet-specific PDFs)
- `demo_AlphaStreet/` (keep for reference, not used in production)
- Any `.env` or config files with AlphaStreet-specific credentials

---

## Migration Checklist

### Backend Files
- [ ] Copy `tmtbot/api/` → `AlphaStreet-Bot/api/` (overwrite)
- [ ] Copy `tmtbot/requirements.txt` → `AlphaStreet-Bot/requirements.txt`
- [ ] Copy `tmtbot/requirements_generator.txt` → `AlphaStreet-Bot/`
- [ ] Copy `tmtbot/vercel.json` → `AlphaStreet-Bot/vercel.json`
- [ ] Copy `tmtbot/.vercelignore` → `AlphaStreet-Bot/.vercelignore`
- [ ] Copy `tmtbot/Generator/` → `AlphaStreet-Bot/Generator/` (if needed)
- [ ] Copy documentation files (CHAT_INTEGRATION_README.md, etc.)

### Branding Updates - HTML Templates
- [ ] `api/templates/index.html` (main page)
- [ ] `api/templates/dashboard.html`
- [ ] `api/templates/chat.html`
- [ ] `api/templates/deal_collection.html`
- [ ] `api/templates/reports.html`
- [ ] `api/templates/login.html`
- [ ] `api/templates/register.html`
- [ ] `api/templates/pricing.html`
- [ ] `api/templates/payment.html`
- [ ] `api/templates/features.html`
- [ ] `api/templates/mission.html`
- [ ] `api/templates/contacts.html`
- [ ] `api/templates/map.html`
- [ ] `api/templates/client_index.html`
- [ ] `api/templates/ai_chat_select.html`
- [ ] `api/templates/LLM_Chat_Demo.html`
- [ ] `api/templates/LLM_Pitch_Demo.html`
- [ ] `api/templates/LLM_chat.html`
- [ ] `api/templates/sample.html`
- [ ] `api/templates/renderTest.html`
- [ ] `api/templates/brief_not_ready.html`
- [ ] `api/templates/404.html`
- [ ] `api/templates/500.html`

### Branding Updates - CSS
- [ ] `api/static/styles.css` (main stylesheet)
- [ ] Any additional CSS files in `api/static/css/`

### Testing
- [ ] Test backend startup
- [ ] Test all major routes
- [ ] Test chat functionality
- [ ] Test authentication
- [ ] Verify branding is correct across all pages
- [ ] Test on local development environment
- [ ] Test deployment to Vercel (if applicable)

---

## Notes & Considerations

### Color Mapping Reference
| TMTBot Original | AlphaStreet Target | Usage |
|-----------------|-------------------|--------|
| `#CC786C` (terracotta) | `#187ABA` (blue) | Primary accent |
| `#D4A37F` (kraft) | `#4695C8` (light blue) | Secondary accent |
| `#EBDBBC` (manila) | `#A3CAE3` (pale blue) | Tertiary accent |
| `#FAFAF7` (ivory) | `#F3F6FA` (light blue-grey) | Background |
| `#101010` (black) | `#0C2740` / `#002B51` (navy) | Text |

### Important Reminders
1. Both sites use the **same backend services and AI models**
2. Only branding (colors, names, visual elements) should differ
3. Business logic and functionality should remain identical
4. The `demo_AlphaStreet/` folder is NOT part of the final product
5. Keep AlphaStreet's PDF assets in `AlphaStreet/static/pdfs/`

### Future Maintenance
- When updating TMTBot, consider if changes should also apply to AlphaStreet-Bot
- Keep branding separate but functionality in sync
- Document any divergence in business logic between the two products

---

## Post-Migration Bug Fixes

### Vercel Deployment Issues Fixed (January 1, 2026)

After the initial migration, Vercel deployment encountered serverless function crashes. The following critical bugs were identified and fixed:

#### 🔴 Issue #1: Environment Variable Naming Inconsistency
**Problem:** Inconsistent environment variable naming between modules caused crashes when `OPENAI_API_KEY` was set in Vercel.
- `api/index.py` expected: `OPENAI_API` ❌
- `api/chat_module.py` expected: `OPENAI_API_KEY` ✅

**Fix Applied:**
```python
# api/index.py line 33
# BEFORE:
OPENAI_API_KEY = os.environ.get("OPENAI_API")

# AFTER:
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
```

#### 🔴 Issue #2: Hardcoded Database Credentials
**Problem:** Production credentials were hardcoded in `api/index.py`, creating security risks and preventing proper environment-based configuration.

**Fixes Applied:**
```python
# MongoDB URI (line 53)
# BEFORE:
MONGODB_URI="mongodb://tmtbot_user:123@124.221.89.25:27017/?authSource=tmtbot"

# AFTER:
MONGODB_URI = os.environ.get("MONGODB_URI")
if not MONGODB_URI:
    raise RuntimeError("Missing MONGODB_URI environment variable. Add it to your .env or Vercel environment.")

# PostgreSQL DATABASE_URL (line 67)
# BEFORE:
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://postgres.raxe...@...')

# AFTER:
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("Missing DATABASE_URL environment variable. Add it to your .env or Vercel environment.")
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
```

#### 🟡 Issue #3: Flask Secret Key Improvement
**Fix Applied:**
```python
# api/index.py line 61
# BEFORE:
app.secret_key = 'your-secret-key-change-this-in-production'

# AFTER:
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-this-in-production')
```

#### Required Vercel Environment Variables
After these fixes, ensure the following environment variables are set in Vercel:
1. **`OPENAI_API_KEY`** - OpenAI API key (standard naming convention)
2. **`MONGODB_URI`** - MongoDB connection string
3. **`DATABASE_URL`** - PostgreSQL connection string
4. **`SECRET_KEY`** (recommended) - Flask session secret key

#### Testing Results
All fixes tested locally on January 1, 2026:
- ✅ Flask starts successfully with environment variables
- ✅ HTTP 200 responses on all pages
- ✅ Database connections successful (PostgreSQL + MongoDB)
- ✅ Login functionality works with TestUser1
- ✅ AlphaStreet branding displays correctly
- ✅ No crashes or runtime errors

**Branch:** `feature/fix-vercel-deployment`
**Files Modified:** `api/index.py`

---

## Contact & Resources

- **GitHub Issues:** Report any migration issues
- **Documentation:** Refer to copied README files for API details
- **Original Docs:**
  - `CHAT_INTEGRATION_README.md` - Chat setup
  - `MAP_SETUP.md` - Map visualization
  - `SQL_QUERIES.md` - Database queries
  - `WEBHOOK_SETUP.md` - Webhook configuration

---

*This document will be updated as the migration progresses.*
