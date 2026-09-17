# FastBuy

FastBuy is a responsive e-commerce frontend built with Next.js App Router. It
lets shoppers discover products and categories, view product details, manage a
cart, sign in or create an account, complete a checkout flow, and view a
locally generated invoice.

## Features

- Product catalogue with search, category, price, and pagination controls
- Category discovery section on the home page
- Product detail pages with image galleries and related products
- Add to cart, quantity controls, removal, and cart totals
- Buy Now flow with authentication redirect support
- Login, signup, session restoration, logout, and profile display
- Checkout form validation with order summary and a $10 delivery fee
- Cash-on-delivery invoice view
- FAQ accordion and contact form feedback
- Newsletter signup feedback in the home page CTA
- Global success and error notifications with `react-hot-toast`
- Responsive layout and light/dark theme support
- Next.js image handling for remote product and category images

## Technology Stack

- Next.js `16.3.5` with the App Router
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- React Hook Form for form validation
- React Context API for authentication and cart state
- `lucide-react` for interface icons
- `react-hot-toast` for user feedback
- External REST API for products, categories, and authentication

## Getting Started

### Requirements

- Node.js 20 or newer is recommended
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root. Use `.env.example` as a template:

```env
API_URL=***
NEXT_PUBLIC_API_URL=***
```

`API_URL` is used by server-side category and authentication requests.
`NEXT_PUBLIC_API_URL` is used by the client-side product hook. Both variables
are required for the complete application flow.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Production commands

```bash
npm run build
npm start
```

The project also includes:

```bash
npm run lint
```

## Project Structure

```text
.
├── app/
│   ├── about/page.tsx                 About page
│   ├── cart/                          Cart page and client content
│   ├── checkout/                      Checkout page and client content
│   ├── components/                    Shared UI and commerce components
│   ├── contact/page.tsx               Contact form
│   ├── context/                       AuthContext and CartContext
│   ├── hooks/useProducts.ts           Client product loading hook
│   ├── invoice/[id]/page.tsx          Local invoice view
│   ├── lib/                           API clients, domain types, auth actions
│   ├── login/                          Login route and form
│   ├── products/                       Catalogue and product detail routes
│   ├── profile/page.tsx               Authenticated profile page
│   ├── sections/                      Home page sections
│   ├── signup/                         Signup route and form
│   ├── error.tsx                       App-level retry UI
│   ├── loading.tsx                     Loading skeleton UI
│   ├── not-found.tsx                   Not-found UI
│   ├── layout.tsx                      Root providers, header, footer, toaster
│   ├── page.tsx                        Home page composition
│   └── globals.css                     Global styles and theme variables
├── public/                             Static images and brand assets
├── next.config.ts                      Next.js output and image configuration
├── postcss.config.mjs                  Tailwind/PostCSS configuration
├── eslint.config.mjs                  ESLint configuration
├── tsconfig.json                       TypeScript configuration
├── .env.example                        Environment variable template
└── package.json                        Scripts and dependencies
```

### Shared components

The `app/components` directory contains the reusable interface pieces used by
multiple routes:

- `Header` and `Footer` provide site-wide navigation and account/cart access.
- `ProductCard`, `ProductGallery`, `ProductInfo`, and `RelatedProducts` build
  the product browsing experience.
- `ProductActions` handles Add to Cart and Buy Now behavior.
- `CheckoutForm` validates customer information and creates the local order.
- `OrderSuccessModal` appears after a successful checkout.

### Home sections

The home page in `app/page.tsx` composes `HeroSection`,
`CategoriesSections`, `FeaturedProducts`, `FAQ`, and `CTA`. The FAQ accordion
and newsletter CTA are client components because they contain interactive form
and state behavior.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with hero, categories, featured products, FAQ, and CTA |
| `/products` | Product catalogue with filters and pagination |
| `/products/[id]` | Product details, gallery, actions, and related products |
| `/cart` | Cart contents, quantities, totals, and checkout link |
| `/checkout` | Cart checkout |
| `/checkout?mode=buy` | Buy Now checkout for one product |
| `/login` | Login form |
| `/signup` | Account creation form |
| `/profile` | Authenticated user profile; redirects to `/login` without a session |
| `/invoice/[id]` | Invoice generated from the latest local order |
| `/about` | About page |
| `/contact` | Contact information and message form |

## Architecture

### App Router and rendering

Next.js server components are used by default. Server components handle page
composition and server-side data access where possible. Components become
client components only when they need browser APIs, state, event handlers, or
client hooks.

Client components include:

- Authentication and cart providers
- Login, signup, product, cart, checkout, and profile interactions
- Theme switching and mobile/header controls
- FAQ accordion, contact form, and newsletter CTA
- Product loading through `useProducts`

The root layout wraps the application with `AuthProvider` and `CartProvider`,
then mounts one global `Toaster` so notifications work consistently across
routes.

### Data access

Data access is kept in `app/lib`:

- `api.ts` builds URLs from environment variables.
- `products.ts` fetches products from the configured `products` endpoint.
- `categories.ts` fetches categories with a one-hour Next.js revalidation
  period and returns an empty list when the request fails.
- `server-auth.ts` contains server actions for login, signup, session lookup,
  token refresh, and logout.
- `order.ts` defines the structure of locally generated orders and invoices.

Product data is loaded in the client through `useProducts`. Category data is
loaded by the server-rendered home page section.

### Authentication

Authentication requests are made through server actions. Access and refresh
tokens are stored in HTTP-only cookies named `mindful_access_token` and
`mindful_refresh_token`. The session provider checks the current session when
the application loads. The profile page performs a server-side session check
and redirects unauthenticated users to `/login`.

When a user selects Buy Now while signed out, the selected product is stored
temporarily, the user is sent to login with a checkout redirect, and the item
is restored after successful login or signup.

### Cart and checkout

`CartContext` owns cart items, quantities, removal, clearing, and total
calculation. The cart is persisted in browser local storage under
`fastbuy-cart`.

Checkout is a frontend flow. On submit, `CheckoutForm` creates an invoice ID,
calculates the subtotal plus the fixed delivery fee, stores the order under
`fastbuy-order`, and clears either the cart or the Buy Now item. The invoice
page reads that order from local storage and displays it as cash on delivery.

The following local-storage keys are used:

| Key | Purpose |
| --- | --- |
| `fastbuy-cart` | Persistent cart contents |
| `fastbuy-buy-now` | Product selected for the Buy Now checkout |
| `fastbuy-pending-buy-now` | Buy Now product held during login/signup redirect |
| `fastbuy-order` | Most recently generated local order/invoice |
| `theme` | Selected `light` or `dark` theme |

### Notifications and validation

`react-hot-toast` is mounted globally in `app/layout.tsx`. Toasts are shown for
cart changes, authentication results, logout results, product-loading errors,
contact submission, and newsletter signup. React Hook Form provides inline
field validation for login, signup, and checkout forms; browser validation is
used for the contact and newsletter forms.

## Design and performance

- Responsive Tailwind layouts are used across desktop and mobile breakpoints.
- The header supports a persistent light/dark theme preference.
- `next/image` is used for product, hero, and brand images where applicable.
- Product/category API logic is separated from presentation components.
- Server-rendered sections reduce unnecessary client-side JavaScript.
- Loading, error, and not-found UI are provided at the app level.
- The production configuration uses Next.js standalone output.

## Current limitations

This is currently a frontend-focused application with temporary browser-side
order persistence:

- Orders are not sent to a backend and are only available in the current
  browser through local storage.
- There is no payment gateway; checkout displays Cash On Delivery.
- The contact form and newsletter form provide local success feedback but do
  not submit to a persistence or email service.
- Cart contents are device-specific and are not synchronized with a user
  account.
- Product and category availability depends on the configured external API.
- The latest local order overwrites the previous local invoice record.

## Future improvements

- Add a backend for products, inventory, orders, and customer records.
- Persist cart and order history per authenticated user.
- Add payment processing and order status tracking.
- Connect contact and newsletter forms to email or CRM services.
- Add product reviews, wishlists, recommendations, and admin tools.
- Add automated tests for authentication, cart behavior, checkout, and routes.

## License

This project is intended for educational and demonstration purposes.
