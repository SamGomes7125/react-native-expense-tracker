# Expense Tracker (React Native + Expo)

A mobile expense tracker for logging, editing and analysing spending, built with Expo Router and TypeScript.

## Features

- Add, edit and delete expenses
- Expense list and home summary
- Analytics tab with spending charts (`react-native-chart-kit`)
- Data persisted on-device with AsyncStorage
- Light and dark themes

## Stack

React Native · Expo · Expo Router · TypeScript · AsyncStorage · react-native-chart-kit

## Run locally

```bash
npm install
npx expo start
```

Then open in Expo Go, an Android emulator or the iOS simulator.

## Structure

```
app/(tabs)/        Home, expenses, add-expense and analytics screens
app/edit-expense.tsx
app/types/         Expense type
app/utils/storage.ts  AsyncStorage persistence
```
