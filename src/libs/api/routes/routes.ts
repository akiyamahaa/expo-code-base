export class Routes {
  static home = '/'
  static about = '/about'
  static store = '/store'
  static flashSale = '/flash-sale'
  static cart = '/cart'
  static checkout = '/checkout'
  static dashboard = '/dashboard'
  static orders = '/dashboard/orders'
  static product = '/products'
  static profile = '/profile'

  // Dynamic routes using methods
  static productSlug(slug: string): string {
    return `/products/${slug}`
  }

  static category(slug: string): string {
    return `/categories/${slug}`
  }

  static userProfile(userId: string): string {
    return `/users/${userId}`
  }
}
