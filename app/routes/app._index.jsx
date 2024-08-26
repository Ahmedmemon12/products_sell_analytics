import { json, useActionData, useLoaderData ,useSubmit} from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { Text, Layout, LegacyCard, Link, Banner, Page, Grid, Select, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useTranslation } from 'react-i18next';
import "animate.css";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const action = async ({ request }) => {

  const formData = await request.formData();
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  const prisma = new PrismaClient();
  const action = formData.get("action");
  console.log("shop:", shop);

  if (action == "ACTION_SAVE_BUTTON_STYLE") {
    let button_settings = JSON.parse(formData.get("setting"));

    if (button_settings) {
      if (button_settings.text == "") {
        return json({ mess: "Button text is required" });
      }
    }


    const data_to_be_update = {
      shop: shop,
      text: button_settings.text,
      btn_enabled: button_settings.btn_enabled,
      btn_sticky: button_settings.btn_sticky,
      hide_addtocart: button_settings.hide_addtocart,
      hide_shopify_buynow: button_settings.hide_shopify_buynow,
      background_color: button_settings.background_color,
      animation: button_settings.animation,
      border_color: button_settings.border_color,
      border_width: parseFloat(button_settings.border_width),
      button_width: parseFloat(button_settings.button_width),
      button_padding: parseFloat(button_settings.button_padding),
      font_size: parseFloat(button_settings.font_size),
      text_color: button_settings.text_color,
      button_fontfamily: button_settings.button_fontfamily
    };

    console.log("data_to_be_update: ", data_to_be_update);


    const setting = await prisma.button_style.upsert({
      where: {
        shop: shop
      },
      update: data_to_be_update,
      create: data_to_be_update,
    });

    console.log("setting: ", setting);

    if (setting) {
      return json({ mess: "Setting has been updated" });
    }

  }


  return json({ mess: null });
}
export const loader = async ({ request }) => {

  const { session } = await authenticate.admin(request);
  const { shop } = session;


  const buttonStyle = {
    shop: 'myShop',                         // shop
    btn_enabled: false,                     // btn_enabled
    text: 'Buy Now',                        // text
    btn_sticky: true,                       // btn_sticky
    hide_shopify_buynow: true,              // hide_shopify_buynow
    hide_addtocart: true,                   // hide_addtocart
    background_color: '#000000',            // background_color
    text_color: '#FFFFFF',                  // text_color
    font_size: '14',                      // font_size
    animation: 'No Animation',                      // animation
    border_color: '#FF0000',                // border_color
    border_width: '1',                    // border_width
    button_width: '100',                  // button_width
    button_padding: '10',                 // button_padding
    button_fontfamily: 'Arial'              // button_fontfamily
  };

  const prisma = new PrismaClient();
  const db_button_setting = await prisma.button_style.findUnique({
    where: {
      shop: shop
    }
  })
  if (db_button_setting) {

    buttonStyle.animation = db_button_setting.animation;
    buttonStyle.background_color = db_button_setting.background_color;
    buttonStyle.border_color = db_button_setting.border_color;
    buttonStyle.border_width = db_button_setting.border_width;
    buttonStyle.btn_enabled = db_button_setting.btn_enabled;
    buttonStyle.btn_sticky = db_button_setting.btn_sticky;
    buttonStyle.button_padding = db_button_setting.button_padding;
    buttonStyle.button_width = db_button_setting.button_width;
    buttonStyle.font_size = db_button_setting.font_size;
    buttonStyle.text = db_button_setting.text;
    buttonStyle.text_color = db_button_setting.text_color;
    buttonStyle.btn_enabled = db_button_setting.btn_enabled;
    buttonStyle.btn_sticky = db_button_setting.btn_sticky;
    buttonStyle.hide_shopify_buynow = db_button_setting.hide_shopify_buynow;
    buttonStyle.hide_addtocart = db_button_setting.hide_addtocart;
    buttonStyle.animation = db_button_setting.animation;
    buttonStyle.button_fontfamily = db_button_setting.button_fontfamily;

    return json({ buttonStyle: buttonStyle });

  }

  console.log("Button Style:", buttonStyle);

  return json({ buttonStyle: buttonStyle });

};

export default function Index() {
  // const { apiKey } = useLoaderData();
  const [Checked, setChecked] = useState(false);
  const [Button_style_state, setButton_style_state] = useState({});
  const submit = useSubmit();
  const loaderdata = useLoaderData();
  const actiondata = useActionData();
  // const {mess} = actiondata;
  // shopify.toast.show(mess);
  const { t } = useTranslation();

  useEffect(() => {
    if (actiondata != null) {

      shopify.toast.show(actiondata.mess);

    }
    setButton_style_state(loaderdata.buttonStyle);
  }, [actiondata, loaderdata])


  const get_font_family = (fontfamily) => {
    switch (fontfamily) {
      case "Theme Default":
        return "inherit"

      case "Open Sans":
        return '"Open Sans", sans-serif'

      case "Lato":
        return '"Lato", sans-serif'

      case "Montserret":
        return '"Montserrat", sans-serif'

      case "Poppins":
        return '"Poppins", sans-serif'

      case "Merriweather":
        return '"Merriweather", serif'

      case "Playfair Display":
        return '"Playfair Display", serif'
      default:
        break;
    }
  }
  const handleChange = (checked, buttontype) => {



    switch (buttontype) {
      case "enable_app":
        setButton_style_state({ ...Button_style_state, btn_enabled: checked })
        break;

      case "btn_sticky":
        setButton_style_state({ ...Button_style_state, btn_sticky: checked })
        break;

      case "hide_shopify_buynow":
        setButton_style_state({ ...Button_style_state, hide_shopify_buynow: checked })
        break;

      case "hide_addtocart":
        setButton_style_state({ ...Button_style_state, hide_addtocart: checked })
        break;

      default:
        break;
    }
  }

  const handle_update_color = (e, property) => {

    switch (property) {
      case "background_color":
        let background_color = e.target.value.slice(0, 7); // Extracting only the color part
        setButton_style_state({ ...Button_style_state, background_color: background_color });

        break;
      case "text_color":
        let text_color = e.target.value.slice(0, 7); // Extracting only the color part
        setButton_style_state({ ...Button_style_state, text_color: text_color });

        break;
      case "border_color":
        let border_color = e.target.value.slice(0, 7); // Extracting only the color part
        setButton_style_state({ ...Button_style_state, border_color: border_color });

        break;

      default:
        break;
    }

  }


  const ACTION_SAVE_BUTTON_STYLE = () => {
    // alert("working");
    submit({
      setting: JSON.stringify(Button_style_state),
      action: "ACTION_SAVE_BUTTON_STYLE"

    },
      { method: "post" })
  }

  return (
    <Page fullWidth>

      <div style={{ marginBottom: "20px" }}>
        {/* <Banner>
          <strong>
            <span style={{ backgroundColor: "#fde98d", borderRadius: "22px", padding: "6px" }}>
              {t("note")}
            </span>
            {' '}{t('toEnableAppEmbedExtension')}{' '}
            <Link onClick={ACTION_SAVE_BUTTON_STYLE}>Click Here</Link> and save.
          </strong>
        </Banner> */}
        <Banner>
          {t("noteIfYouWantToAddBuyNow")}
        </Banner>


      </div>

      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('enableApp')}</p>
                <div className="my-2">
                  <input type="checkbox" onChange={(e) => { handleChange(e.target.checked, "enable_app") }} checked={Button_style_state.btn_enabled} hidden="hidden" id="username" />
                  <label class="switch" for="username"></label>
                  {/* <Switch uncheckedIcon={false} checkedIcon={false} onColor={"#1b9af1"} onChange={(e) => { handleChange(e, "enable_app") }} checked={Button_style_state.btn_enabled} /> */}
                </div>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <div className="my-2">
                  <TextField
                    label={t("buttonText")}
                    value={Button_style_state.text}
                    autoComplete="off"
                    onChange={(value) => { setButton_style_state({ ...Button_style_state, text: value }) }}

                  />
                </div>
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>

                <p>{t('enableStickyBuyButton')}</p>
                <div className="my-2">
                  {/* <Switch uncheckedIcon={false} checkedIcon={false} onColor={"#1b9af1"} onChange={(e) => { handleChange(e, "btn_sticky") }} checked={Button_style_state.btn_sticky} /> */}
                  <input type="checkbox" onChange={(e) => { handleChange(e.target.checked, "btn_sticky") }} checked={Button_style_state.btn_sticky} hidden="hidden" id="btn_sticky" />
                  <label class="switch" for="btn_sticky"></label>
                </div>
                <p>{t('noteItWillShowYouStickyButton')}</p>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label={t('fontFamily')}
                  options={[
                    { label: t('themeDefault'), value: 'Theme Default' },
                    { label: t('openSans'), value: 'Open Sans' },
                    { label: t('lato'), value: 'Lato' },
                    { label: t('montserret'), value: 'Montserret' },
                    { label: t('poppins'), value: 'Poppins' },
                    { label: t('merriweather'), value: 'Merriweather' },
                    { label: t('playfairDisplay'), value: 'Playfair Display' }
                  ]}
                  value={Button_style_state.button_fontfamily}
                  onChange={(value) => setButton_style_state({ ...Button_style_state, button_fontfamily: value })}
                />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('hideShopifyBuyNow')}</p>
                <div className="my-2">
                  {/* <Switch uncheckedIcon={false} checkedIcon={false} onColor={"#1b9af1"} onChange={(e) => { handleChange(e, "hide_shopify_buynow") }} checked={Button_style_state.hide_shopify_buynow} /> */}
                  <input type="checkbox" onChange={(e) => { handleChange(e.target.checked, "hide_shopify_buynow") }} checked={Button_style_state.hide_shopify_buynow} hidden="hidden" id="hide_shopify_buynow" />
                  <label class="switch" for="hide_shopify_buynow"></label>
                </div>
                <p>{t('noteByEnablingShopifyDefault')}</p>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('hideAddToCart')}</p>

                <div className="my-2">
                  {/* <Switch uncheckedIcon={false} checkedIcon={false} onColor={"#1b9af1"} onChange={(e) => { handleChange(e, "hide_addtocart") }} checked={Button_style_state.hide_addtocart} /> */}
                  <input type="checkbox" onChange={(e) => { handleChange(e.target.checked, "hide_addtocart") }} checked={Button_style_state.hide_addtocart} hidden="hidden" id="hide_addtocart" />
                  <label class="switch" for="hide_addtocart"></label>
                </div>
                <p>{t('noteByEnablingAddToCart')}</p>
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('backgroundColor')}</p>
                <input onChange={(e) => (handle_update_color(e, "background_color"))} value={Button_style_state.background_color} style={{ display: "block", width: "200px", height: "40px" }} type="color" />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('textColor')}</p>
                <input onChange={(e) => (handle_update_color(e, "text_color"))} value={Button_style_state.text_color} style={{ display: "block", width: "200px", height: "40px" }} type="color" />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                {/* <p>Font Size</p> */}
                <TextField
                  label={t('fontSize')}
                  type="number"
                  value={Button_style_state.font_size}
                  suffix="px"
                  autoComplete="off"
                  onChange={(value) => {
                    setButton_style_state({ ...Button_style_state, font_size: value })
                  }}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label={"Select Animation"}
                  options={[
                    { label: 'No Animation', value: 'No Animation' },
                    { label: 'bounce', value: 'bounce' },
                    { label: 'headShake', value: 'headShake' },
                    { label: 'heartBeat', value: 'heartBeat' },
                    { label: 'jello', value: 'jello' },
                    { label: 'rubberBand', value: 'rubberBand' },
                    { label: 'shakeX', value: 'shakeX' },
                    { label: 'swing', value: 'swing' },
                    { label: 'tada', value: 'tada' },
                    { label: 'shakeY', value: 'shakeY' },
                    { label: 'wobble', value: 'wobble' }
                  ]}

                  value={Button_style_state.animation}
                  onChange={(value) => setButton_style_state({ ...Button_style_state, animation: value })}
                />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <p>{t('borderColor')}</p>
                <input onChange={(e) => (handle_update_color(e, "border_color"))} value={Button_style_state.border_color} style={{ display: "block", width: "200px", height: "40px" }} type="color" />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label={t('borderWidth')}
                  type="number"
                  value={Button_style_state.border_width}
                  suffix="px"
                  autoComplete="off"
                  onChange={(value) => {
                    setButton_style_state({ ...Button_style_state, border_width: value })
                  }}
                />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <LegacyCard sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label={t('buttonWidth')}
                  type="number"
                  max={100}
                  min={1}
                  value={Button_style_state.button_width}
                  suffix="%"
                  autoComplete="off"
                  onChange={(value) => {
                    setButton_style_state({ ...Button_style_state, button_width: value })
                  }}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label={t('buttonPadding')}
                  type="number"
                  value={Button_style_state.button_padding}
                  suffix="px"
                  autoComplete="off"
                  onChange={(value) => {
                    setButton_style_state({ ...Button_style_state, button_padding: value })
                  }}
                />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">

          <LegacyCard title={t('preview')} primaryFooterAction={{ content: 'Save', onAction: ACTION_SAVE_BUTTON_STYLE }} sectioned>

            {Button_style_state.animation != "No Animation" ?
              <button className={"animate__animated animate__" + Button_style_state.animation} style={{ borderColor: Button_style_state.border_color, backgroundColor: Button_style_state.background_color, color: Button_style_state.text_color, fontSize: Button_style_state.font_size + "px", borderWidth: Button_style_state.border_width + "px", width: Button_style_state.button_width + "%", padding: Button_style_state.button_padding + "px", fontFamily: get_font_family(Button_style_state.button_fontfamily) }}>
                {Button_style_state.text}
              </button>
              :
              <button className={"animate__animated animate__" + Button_style_state.animation} style={{ borderColor: Button_style_state.border_color, backgroundColor: Button_style_state.background_color, color: Button_style_state.text_color, fontSize: Button_style_state.font_size + "px", borderWidth: Button_style_state.border_width + "px", width: Button_style_state.button_width + "%", padding: Button_style_state.button_padding + "px", fontFamily: get_font_family(Button_style_state.button_fontfamily) }}>
                {Button_style_state.text}
              </button>
            }
          </LegacyCard>



        </Layout.Section>
      </Layout>
    </Page>
  )
}
