import { Grid, Page, Select, Button,TextContainer,Badge ,Card} from "@shopify/polaris";
import { useState } from 'react';
import { useNavigate, useSubmit } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";


export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [selectLang, setSelectedLang] = useState(i18n.language);
  const submit = useSubmit();

  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };




  const options = [
    { label: 'English', value: 'en' },
    { label: 'Italian', value: 'it' },
  ];



  return (

 
    <Page fullWidth>
    <div style={{ padding: 'var(--p-space-400) var(--p-space-400) var(--p-space-600)' }}>
 
        <div className="Polaris-Page-Header--mobileView Polaris-Page-Header--mediumTitle">
          <div className="Polaris-Page-Header__Row">
            <div className="Polaris-Page-Header__RightAlign">
              <div className="Polaris-Page-Header__Actions">
                <div className="Polaris-Page-Header__PrimaryActionWrapper" style={{display:"flex",columnGap:"10px"}}>
                  <Button primary onClick={()=>navigate('/app')} >
                    <span className="Polaris-Text--bodySm Polaris-Text--semibold" >{t('Manage')}</span>
                  </Button>
                  <Button primary onClick={()=>navigate('/app/instructions')} >
                    <span className="Polaris-Text--bodySm Polaris-Text--semibold"  >{t('Instruction')}</span>
                  </Button>
                  <Button primary onClick={()=>navigate('/app/Button_Analytics')} >
                    <span className="Polaris-Text--bodySm Polaris-Text--semibold"  >{t('Analytics')}</span>
                  </Button>
                  <Button primary onClick={()=>navigate('/app')} >
                    <span className="Polaris-Text--bodySm Polaris-Text--semibold"  >{ t('write_a_Review')}</span>
                  </Button>
                  <a target="_blank" className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter"  href="https://apps.shopify.com/partners/easycom-italia?locale=it" >
                    <span className="Polaris-Text--bodySm Polaris-Text--semibold"  >{t('Our_Other_Apps')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
   
    </div>
       <Grid columns={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
         <Grid.Cell>
           <Select
             label="Select Language"
             options={options}
             onChange={(value) => changeLanguage(value)}
             value={selectLang} // set the default value or use state
           />
         </Grid.Cell>
       </Grid>
  </Page>

  );
}
