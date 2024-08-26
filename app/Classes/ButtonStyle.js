class ButtonStyle {
    constructor(shop, btn_enabled = false, text, btn_sticky = false, hide_shopify_buynow = false, hide_addtocart, background_color, text_color, font_size, animation, border_color, border_width, button_width, button_padding,button_fontfamily) {
      this.id = null; // Will be set by the database
      this.shop = shop;
      this.btn_enabled = btn_enabled;
      this.text = text;
      this.btn_sticky = btn_sticky;
      this.hide_shopify_buynow = hide_shopify_buynow;
      this.hide_addtocart = hide_addtocart;
      this.background_color = background_color;
      this.text_color = text_color;
      this.font_size = font_size;
      this.animation = animation;
      this.border_color = border_color;
      this.border_width = border_width;
      this.button_width = button_width;
      this.button_padding = button_padding;
      this.button_fontfamily = button_fontfamily
    }
  
    enableButton() {
      this.btn_enabled = true;
    }
  
    disableButton() {
      this.btn_enabled = false;
    }
  
    makeSticky() {
      this.btn_sticky = true;
    }
  
    unstick() {
      this.btn_sticky = false;
    }
  
    hideBuyNowButton() {
      this.hide_shopify_buynow = true;
    }
  
    showBuyNowButton() {
      this.hide_shopify_buynow = false;
    }
  
    hideAddToCartButton() {
      this.hide_addtocart = true;
    }
  
    showAddToCartButton() {
      this.hide_addtocart = false;
    }
  }

export default ButtonStyle;