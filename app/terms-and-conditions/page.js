import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Package, Shield, Truck, CreditCard, RotateCcw, Ruler } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-tertiary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-tertiary to-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-8 w-8" />
            <Badge variant="primary" className="text-lg px-4 py-2">
              Store Policies
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Premika Store</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">Terms & Conditions</p>
          <div className="mt-8 h-1 w-24 bg-primary-foreground/30 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <Card className="border-l-4 border-l-primary shadow-lg">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-foreground/80">
              At <span className="font-semibold text-primary">Premika</span>, we are committed to providing a
              transparent and satisfying shopping experience. Please review our store policies carefully before placing
              an order. By making a purchase, you agree to these terms and conditions.
            </p>
          </CardContent>
        </Card>

        {/* Policy Cards */}
        <div className="grid gap-6">
          {/* Payment Policy */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-tertiary/20">
            <CardHeader className="bg-gradient-to-r from-tertiary/10 to-primary/5">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                Payment Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">No Cash on Delivery (COD)</h4>
                    <p className="text-foreground/70 leading-relaxed">
                      We do not offer Cash on Delivery services. All orders must be prepaid through the available
                      payment options at checkout including credit/debit cards, UPI, net banking, and digital wallets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return & Exchange Policy */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-tertiary/20">
            <CardHeader className="bg-gradient-to-r from-tertiary/10 to-primary/5">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-primary" />
                </div>
                Return & Exchange Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2 text-destructive">General Policy</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    We do not accept returns, refunds, or exchanges unless the error is from our side. Kindly
                    double-check your order details, size, and color before confirming your purchase.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-primary">Returns Accepted Only For Store Errors</h4>
                  <div className="space-y-3">
                    <p className="text-foreground/70">Returns will be accepted only if:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/70">
                          We sent the wrong item, wrong size, or a defective product
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/70">
                          A full unboxing video is provided as proof — the video must be uncut and continuous from the
                          moment the package is opened
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/70">
                          The return process is initiated within 2–3 days of receiving the order
                        </span>
                      </li>
                    </ul>
                    <p className="text-sm text-foreground/60 mt-3">
                      Returns requested after this window will not be accepted. Refunds (if applicable) will be
                      processed after we receive and inspect the returned item.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Size Information */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-tertiary/20">
            <CardHeader className="bg-gradient-to-r from-tertiary/10 to-primary/5">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Ruler className="h-6 w-6 text-primary" />
                </div>
                Size Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-tertiary/10 border border-tertiary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3">Important Size Guidelines</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-tertiary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">
                        Please refer to our size chart before placing your order
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-tertiary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">All sizes mentioned are in inches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-tertiary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">
                        Accurate measurements help ensure a perfect fit and avoid sizing issues
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-tertiary/20">
            <CardHeader className="bg-gradient-to-r from-tertiary/10 to-primary/5">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Estimated Delivery Time</h4>
                    <p className="text-foreground/70">8–9 business days from order confirmation</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 bg-muted/50 p-3 rounded-lg">
                  <strong>Note:</strong> Delivery times may vary slightly depending on your location and courier
                  services. We will provide tracking information once your order is shipped.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Terms */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-tertiary/20">
            <CardHeader className="bg-gradient-to-r from-tertiary/10 to-primary/5">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                Additional Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Order Confirmation</h4>
                    <p className="text-sm text-foreground/70">
                      All orders are subject to availability and confirmation of the order price.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Product Images</h4>
                    <p className="text-sm text-foreground/70">
                      Colors may vary slightly due to screen settings and lighting conditions.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Privacy</h4>
                    <p className="text-sm text-foreground/70">
                      Your personal information is protected and will not be shared with third parties.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Customer Support</h4>
                    <p className="text-sm text-foreground/70">
                      Contact our support team for any queries before placing your order.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer */}
        <Card className="bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">We appreciate your understanding and cooperation.</p>
            <p className="text-foreground/70 mb-4">
              For any queries, feel free to contact our support team before placing your order.
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-xl">
              <span>Thank you for shopping with</span>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">Premika!</span>
            </div>
            <p className="text-sm text-foreground/50 mt-4">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
