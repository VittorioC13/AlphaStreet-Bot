# AlphaStreet Bot - Market Intelligence Platform

AlphaStreet Bot is a comprehensive market intelligence platform providing curated analysis and insights across TMT, Energy, Healthcare, Consumer, and Industrial sectors. The platform delivers daily briefs, deal analysis, and AI-powered chat assistance for investment banking professionals.

## 🚀 Features

- **Multi-Sector Coverage**: TMT, Energy, Healthcare, Consumer, and Industrial sectors
- **Regional Analysis**: US, Europe, and APAC market coverage
- **Daily Briefs**: 5 reports per region daily across all sectors
- **AI Chat Assistant**: Sector-specific AI assistance for market analysis
- **Deal Intelligence**: Comprehensive M&A deal tracking and analysis
- **Premium Access Control**: Tiered subscription model (Basic, Premium, Max)
- **Interactive Dashboard**: Modern, responsive UI with real-time updates

## 📋 Prerequisites

- Python 3.8+
- MongoDB (for chat history and user management)
- PostgreSQL (for user authentication via SQLAlchemy)
- OpenAI API key (optional, for full AI chat functionality)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VittorioC13/AlphaStreet-Bot.git
   cd AlphaStreet-Bot
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file or export these variables:
   ```bash
   # Database
   export DATABASE_URL="your_postgresql_connection_string"
   export MONGODB_URI="your_mongodb_connection_string"
   export MONGO_DB_NAME="your_database_name"

   # OpenAI (optional, for full AI features)
   export OPENAI_API_KEY="your_openai_api_key"

   # Flask
   export FLASK_SECRET_KEY="your_secret_key"
   ```

## 🏃 Running the Application

### Local Development

```bash
cd api
python index.py
```

The application will be available at `http://localhost:5000`

### Production Deployment (Vercel)

The application is configured for Vercel deployment:

```bash
vercel deploy
```

## 📁 Project Structure

```
AlphaStreet-Bot/
├── api/                          # Main Flask application
│   ├── index.py                  # Main application entry point
│   ├── chat_module.py            # AI chat functionality
│   ├── templates/                # HTML templates (23 files)
│   │   ├── index.html           # Landing page
│   │   ├── dashboard.html       # Main dashboard
│   │   ├── chat.html            # Chat interface
│   │   └── ...
│   ├── static/                   # Static assets (136MB)
│   │   ├── assets/              # Briefs, research, deals, exhibits
│   │   ├── css/                 # Stylesheets
│   │   ├── fonts/               # Custom fonts
│   │   └── data/                # Data files
│   └── term_definitions.json    # Industry terminology
├── Generator/                    # Report generation utilities
├── requirements.txt              # Python dependencies
├── vercel.json                   # Vercel deployment config
└── Documentation/
    ├── CHAT_INTEGRATION_README.md
    ├── MAP_SETUP.md
    ├── SQL_QUERIES.md
    └── WEBHOOK_SETUP.md
```

## 🔑 Key Components

### Backend (`api/index.py`)
- Flask web application with 80KB of business logic
- User authentication and authorization
- PostgreSQL + MongoDB integration
- Premium access control
- Report serving and management

### Chat Module (`api/chat_module.py`)
- AI-powered chat assistant
- Sector-specific context awareness
- Demo mode (works without API key)
- Conversation history tracking

### Frontend
- Modern responsive design with Tailwind CSS
- Interactive dashboard with real-time updates
- PDF viewer for reports and briefs
- Mobile-optimized experience

## 👥 User Roles & Access

- **None**: Basic access to landing page
- **Basic**: Limited preview access
- **Premium**: Full access to reports and briefs
- **Max**: Complete access including advanced features

## 🗄️ Database Schema

### PostgreSQL (User Management)
- User authentication
- Premium status tracking
- Subscription expiration

### MongoDB (Chat & Conversations)
- Chat history
- Conversation threads
- Message tracking

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGO_DB_NAME` | MongoDB database name | Yes |
| `OPENAI_API_KEY` | OpenAI API key for chat | No |
| `FLASK_SECRET_KEY` | Flask session secret | Yes |

### Feature Flags

The application supports demo mode for chat functionality when no OpenAI API key is provided.

## 📊 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/auth/user` - Get current user

### Chat
- `POST /chat/api/send` - Send chat message
- `GET /chat/api/history` - Get chat history
- `GET /chat/api/status` - Check chat service status

### Reports
- `GET /dashboard` - Main dashboard
- `GET /reports` - Reports listing
- `GET /deal_collection` - Deal analysis

## 🎨 Branding

AlphaStreet Bot uses a professional blue color palette:
- Primary: #187ABA
- Secondary: #4695C8
- Tertiary: #A3CAE3
- Background: #F3F6FA
- Text: #0C2740

## 🧪 Testing

Run the application in demo mode (no API keys required):
```bash
python api/index.py
```

Visit `http://localhost:5000` and register a test account.

## 📝 Development Notes

- The application shares backend infrastructure with TMTBot (MongoDB database `tmtbot`)
- TMT sector references refer to the Technology, Media, Telecommunications industry
- All user-facing branding is AlphaStreet-specific
- PDF briefs in `api/static/assets/briefs/` use sector-specific naming (e.g., `US_TMT_Brief_`)

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
Ensure all environment variables are set and run:
```bash
python api/index.py
```

## 📖 Additional Documentation

- [Chat Integration Guide](CHAT_INTEGRATION_README.md)
- [Map Visualization Setup](MAP_SETUP.md)
- [SQL Query Reference](SQL_QUERIES.md)
- [Webhook Configuration](WEBHOOK_SETUP.md)
- [Migration History](MIGRATION_SUMMARY.md)
- [Development Guide](CLAUDE.md)

## 🤝 Contributing

This is a private repository. For access or questions, contact the repository owner.

## 📄 License

Proprietary - All rights reserved

## 🔗 Related Projects

- **TMTBot**: Sibling project sharing the same backend infrastructure
- Both applications use the same MongoDB database and backend services
- Only branding and client-specific customizations differ

---

**Note**: This project was migrated from TMTBot with complete rebranding for AlphaStreet. See [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for migration details.
