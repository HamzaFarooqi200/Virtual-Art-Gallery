// Footer.js

import React from 'react';
import './Footer.css'; // Import your styling
import { Link } from 'react-router-dom';
import styled from "styled-components";

const FooterComponent = () => {
  return (
    <Footer1>
      <Footer>
        <CliconEcommerce>
          <Logo>
            <Icon alt="" src="/icon.svg" />
            <Clicon>VAG</Clicon>
          </Logo>
          <ContactInfo>
            <PhoneNumber>
              <CustomerSupports>Customer Supports:</CustomerSupports>
              <Div8>(629) 555-0129</Div8>
            </PhoneNumber>
            <WashingtonAveManchester>
              4517 Washington Ave. Manchester, Kentucky 39495
            </WashingtonAveManchester>
            <Infokinbocom>infovag@kinbo.com</Infokinbocom>
          </ContactInfo>
        </CliconEcommerce>
        <TopCategory>
          <DownloadApp>Top ART Category</DownloadApp>
          <Item>
            <FooterLinks>
              <Devider />
              <Label>{`Calligraphy Artworks`}</Label>
            </FooterLinks>
            <FooterLinks>
              <Label>Painting Artworks</Label>
            </FooterLinks>
            <FooterLinks>
              <Label>Sketching Artworks</Label>
            </FooterLinks>
            <FooterLinks1>
              <Devider />
              <Label>Photography Artworks</Label>
            </FooterLinks1>
            <FooterLinks>
              <Label>{`VAG for Fairs`}</Label>
            </FooterLinks>
            <FooterLinks>
              <Label>{`VAG for Exhibitions`}</Label>
            </FooterLinks>
            <Button5>
              <Label>
                <Link className="text-white" to="/discoverArt">
                  Browse All Artworks
                </Link>
              </Label>
              <Link className="text-white" to="/discoverArt">
                <RegularmagnifyingglassIcon
                  alt=""
                  src="/regulararrowright.svg"
                />
              </Link>
            </Button5>
          </Item>
        </TopCategory>
        <TopCategory>
          <DownloadApp>Quick links</DownloadApp>
          <Item>
            <FooterLinks>
              <Label>
                <Link className="text-white" to="/AddCart">
                  Shoping Cart
                </Link>
              </Label>
            </FooterLinks>
            <FooterLinks>
              <Label>
                <Link className="text-white" to="/team">
                  About Us{" "}
                </Link>
              </Label>
            </FooterLinks>
          </Item>
        </TopCategory>
        <PopularTag>
          <DownloadApp>Download APP</DownloadApp>
          <Links>
            <MobileApp>
              <AppleNegative1Icon alt="" src="/icongoogleplay-1.svg" />
              <Info1>
                <GetItNow>Get it now</GetItNow>
                <GooglePlay>Google Play</GooglePlay>
              </Info1>
            </MobileApp>
            <MobileApp>
              <AppleNegative1Icon alt="" src="/applenegative-1.svg" />
              <Info1>
                <GetItNow>Get it now</GetItNow>
                <GooglePlay>App Store</GooglePlay>
              </Info1>
            </MobileApp>
          </Links>
        </PopularTag>
      </Footer>
      <Copyright>
        <KinboEcommerce>
          © 2024 Virtual Art Gallery. All rights reserved
        </KinboEcommerce>
      </Copyright>
    </Footer1>
  );
};

export default FooterComponent;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--gap-5xs);
`;

const Icon = styled.img`
  width: 48px;
  position: relative;
  height: 48px;
`;
const Clicon = styled.b`
  position: relative;
  letter-spacing: -0.02em;
  line-height: 40px;
`;
const RegularmagnifyingglassIcon = styled.img`
  width: 20px;
  position: relative;
  height: 20px;
`;
// const Category1 = styled.div`
//   width: 312px;
//   position: relative;
//   line-height: 24px;
//   text-transform: uppercase;
//   font-weight: 500;
//   display: inline-block;
// `;
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   justify-content: flex-start;
//   gap: var(--gap-5xs);
// `;
// const Tag2 = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   gap: var(--gap-5xs);
//   font-size: var(--body-small-600-size);
// `;
const PopularTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-lg);
`;
const CustomerSupports = styled.div`
  width: 312px;
  position: relative;
  line-height: 20px;
  display: inline-block;
`;
const Div8 = styled.div`
  width: 312px;
  position: relative;
  font-size: var(--body-large-500-size);
  line-height: 24px;
  font-weight: 500;
  color: var(--gray-00);
  display: inline-block;
`;
const PhoneNumber = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  font-size: var(--body-small-600-size);
`;
const WashingtonAveManchester = styled.div`
  width: 248px;
  position: relative;
  line-height: 24px;
  color: var(--gray-300);
  display: inline-block;
`;
const Infokinbocom = styled.div`
  width: 312px;
  position: relative;
  line-height: 24px;
  font-weight: 500;
  color: var(--gray-00);
  display: inline-block;
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
  font-size: var(--label-02-size);
  color: var(--gray-500);
`;
const CliconEcommerce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xl);
  font-size: var(--font-size-13xl);
`;
const DownloadApp = styled.div`
  width: 200px;
  position: relative;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  font-weight: bold
  color:white
`;
const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-7xs) 0px;
`;
const Devider = styled.div`
  width: 26px;
  position: relative;
  border-top: 2px solid var(--warning-500);
  box-sizing: border-box;
  height: 2px;
`;
const FooterLinks1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-7xs) 0px;
  gap: var(--gap-5xs);
  color: var(--gray-00);
`;
const Button5 = styled.div`
  background-color: var(--color-gray);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-7xs) 0px;
  gap: var(--gap-5xs);
  color: var(--warning-500);
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: var(--body-small-600-size);
  color: var(--gray-400);
`;
const TopCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
`;
const AppleNegative1Icon = styled.img`
  width: 32px;
  position: relative;
  height: 32px;
  overflow: hidden;
  flex-shrink: 0;
`;
const GetItNow = styled.div`
  width: 88px;
  position: relative;
  line-height: 13px;
  display: inline-block;
`;
const GooglePlay = styled.div`
  width: 88px;
  position: relative;
  font-size: var(--body-small-600-size);
  line-height: 20px;
  font-weight: 600;
  display: inline-block;
`;
const Info1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const MobileApp = styled.div`
  border-radius: var(--br-10xs);
  background-color: var(--gray-800);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-base) var(--padding-xl);
  gap: var(--gap-base);
`;
const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
  font-size: var(--font-size-2xs);
  font-family: var(--font-inter);
`;
// const Tag3 = styled.div`
//   border-radius: var(--br-11xs);
//   border: 1px solid var(--gray-800);
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding: var(--padding-7xs) var(--padding-xs);
// `;
// const Tag4 = styled.div`
//   border-radius: var(--br-11xs);
//   background-color: var(--gray-800);
//   border: 1px solid var(--gray-00);
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding: var(--padding-7xs) var(--padding-xs);
// `;
const Footer = styled.div`
  position: absolute;
  height: 85.59%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 14.41%;
  left: 0%;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-53xl) var(--padding-281xl);
  box-sizing: border-box;
  gap: var(--gap-5xl);
  padding: var(--padding-53xl) var(--padding-281xl) var(--padding-base)
    var(--padding-281xl); /* Adjusted padding */
  gap: var(--gap-5xl);
`;
const KinboEcommerce = styled.div`
  width: 1320px;
  position: relative;
  line-height: 20px;
  display: inline-block;
  flex-shrink: 0;
`;
const Copyright = styled.div`
  position: absolute;
  height: 14.41%;
  width: 100%;
  top: 85.59%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background-color: var(--color-gray);
  box-shadow: 0px 1px 0px #303639 inset;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xl) var(--padding-281xl);
  box-sizing: border-box;
  text-align: center;
  font-size: var(--body-small-600-size);
  color: var(--gray-300);
`;
const Footer1 = styled.div`
  width: 1920px;
  position: relative;
  height: 472px;
  font-size: var(--label-02-size);
`;
const Label = styled.div`
  position: relative;
  line-height: 20px;
  font-weight: 500;
`;