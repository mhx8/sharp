This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

This project uses Azure Table Storage for data persistence. You need to configure Azure Storage credentials before running the application.

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
AZURE_STORAGE_ACCOUNT_KEY=your-storage-account-key
AZURE_STORAGE_TABLE_ENDPOINT=https://your-storage-account-name.table.core.windows.net
```

### Getting Azure Storage Credentials

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to your Storage Account (or create a new one)
3. In the left sidebar, click on "Access keys" under Security + networking
4. Copy the "Storage account name" and one of the "Key" values
5. Add these to your `.env.local` file

## Getting Started

First, set up your environment variables (see above), then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.