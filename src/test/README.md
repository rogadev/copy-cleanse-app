# Test Suite Documentation

This directory contains comprehensive tests for the mobile text cleaning functionality.

## Test Structure

### Unit Tests

- `src/lib/utils/deviceDetection.test.ts` - Mobile detection logic
- `src/lib/utils/textCleaner.test.ts` - Text cleaning algorithms
- `src/lib/utils/feedbackManager.test.ts` - Feedback management system
- `src/lib/types/feedback.test.ts` - Type definitions and constants
- `src/lib/components/MobileActionButtons.test.ts` - Mobile button component
- `src/lib/components/DesktopActionButtons.test.ts` - Desktop button component

### Integration Tests

- `src/test/integration/clipboard.test.ts` - Clipboard API functionality
- `src/test/integration/mobile-interactions.test.ts` - Touch event handling
- `src/test/integration/page-mobile.test.ts` - Main page mobile integration

### Responsive Tests

- `src/test/responsive/viewport.test.ts` - Viewport size handling

## Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Test Coverage

The test suite covers:

✅ **Mobile Detection**

- User agent detection
- Touch capability detection
- Screen size detection
- Responsive state management

✅ **Touch Event Handling**

- Long press detection
- Touch feedback states
- Event cleanup

✅ **Text Cleaning**

- Hidden character removal
- Smart quote conversion
- Dash normalization
- URL parameter cleaning
- Fullwidth character conversion

✅ **Clipboard Functionality**

- Modern clipboard API
- Fallback methods
- Permission handling
- Error scenarios

✅ **Component Behavior**

- Button states and interactions
- Responsive styling
- Accessibility compliance
- Touch target sizes

✅ **Feedback System**

- Message display
- Auto-clearing timers
- Error handling
- Mobile-specific feedback

## Browser Compatibility Testing

Tests simulate various mobile environments:

- iOS Safari
- Android Chrome
- Touch devices with small screens
- Desktop browsers

## Accessibility Testing

Tests verify:

- Touch target sizes (44px minimum)
- Screen reader compatibility
- Keyboard navigation
- Color contrast requirements
