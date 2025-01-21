/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamp)
    - apps
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - icon (text)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - features
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - app_id (uuid, foreign key)
    - subscriptions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - plan_id (uuid, foreign key)
      - status (text)
      - current_period_end (timestamp)
    - pricing_plans
      - id (uuid, primary key)
      - name (text)
      - price (numeric)
      - billing_cycle (text)
      - features (text[])

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Apps table
CREATE TABLE apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own apps"
  ON apps
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Features table
CREATE TABLE features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  app_id uuid REFERENCES apps(id) ON DELETE CASCADE
);

ALTER TABLE features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD features of their apps"
  ON features
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM apps
      WHERE apps.id = features.app_id
      AND apps.user_id = auth.uid()
    )
  );

-- Pricing plans table
CREATE TABLE pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  billing_cycle text NOT NULL,
  features text[] NOT NULL
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pricing plans"
  ON pricing_plans
  FOR SELECT
  TO authenticated
  USING (true);

-- Subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES pricing_plans(id) ON DELETE RESTRICT,
  status text NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);