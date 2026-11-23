import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

export function CartDrawer() {
  const { open, setOpen, items, updateQuantity, removeItem, subtotal } = useCart();
  const delivery = subtotal > 60 ? 0 : 8;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 p-6">
          <SheetTitle className="font-display text-2xl">Your bouquet basket</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bloom-gradient">
              <ShoppingBag className="h-6 w-6 text-[color:var(--burgundy)]" />
            </div>
            <div>
              <p className="font-display text-xl">Nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a bouquet and it'll bloom right here.
              </p>
            </div>
            <Button onClick={() => setOpen(false)} asChild>
              <Link to="/shop">Browse flowers</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bloom-gradient">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-display text-lg leading-tight">
                          {item.product.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.product.category}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                            aria-label="decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                            aria-label="increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display text-lg text-[color:var(--burgundy)]">
                          KSh {item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border/60 bg-secondary/50 p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">KSh {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {delivery === 0 ? "Free" : `KSh ${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-2 text-base">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-lg text-[color:var(--burgundy)]">
                    KSh {(subtotal + delivery).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="mt-4 w-full rounded-full bg-[color:var(--burgundy)] text-primary-foreground hover:bg-[color:var(--rose)]"
                size="lg"
                onClick={() => setOpen(false)}
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Free delivery on orders over KSh 6,000
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}