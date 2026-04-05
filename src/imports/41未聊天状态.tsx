import svgPaths from "./svg-lhzwhe1sxq";
import imgJimeng2026030266462D3D1 from "figma:asset/b93494faee35a9a294cc62060102dc8cab592986.png";
import { imgVector } from "./svg-6bggj";

function Container() {
  return <div className="absolute bg-gradient-to-b from-[rgba(236,209,180,0.6)] h-[499.99px] left-0 to-[rgba(236,209,180,0)] top-0 via-1/2 via-[rgba(236,209,180,0.3)] w-[392.841px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[rgba(236,209,180,0.1)] blur-[64px] left-[-101px] rounded-[27461600px] size-[699.991px] top-[43px]" data-name="Container" />;
}

function Container3() {
  return <div className="absolute bg-[rgba(255,255,255,0.8)] h-[48px] left-[108.98px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] top-[-48px] w-[280px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute h-[27.494px] left-[128.95px] top-[-34.81px] w-[206.996px]" data-name="Container">
      <p className="absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[27.5px] left-0 text-[20px] text-black top-[-2.82px] tracking-[0.67px] whitespace-nowrap">我不舒服</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[82.481px] left-[19.97px] top-[13.18px] w-[206.996px]" data-name="Container">
      <div className="absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[27.5px] left-[0.03px] text-[20px] text-black top-[-3.18px] tracking-[0.67px] w-[255px]">
        <p className="mb-0">新的一天开始了</p>
        <p>脉脉想知道你的身体情况！</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[80px] left-[48.98px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] top-[-147px] w-[280px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute left-[-27.98px] size-[449.99px] top-[262px]" data-name="Container">
      <div className="absolute h-[482px] left-[-31.02px] top-[-67px] w-[526px]" data-name="jimeng-2026-03-02-6646-将图中的2D卡通风格老年男性转换为3D版本，保留人物的白发、米白色立领唐装、慈祥... 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.13%] left-0 max-w-none top-0 w-full" src={imgJimeng2026030266462D3D1} />
        </div>
      </div>
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Group">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.665px_-1.662px] mask-size-[19.975px_19.975px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3119 18.3119">
            <path d={svgPaths.p26065c00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66455" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.084px_-1.786px] mask-size-[19.975px_19.975px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7696 10.7688">
            <path d={svgPaths.p3a213200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66455" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[19.975px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14px] size-[19.975px] top-[14px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#ecd1b4] left-[272.88px] opacity-50 rounded-[12px] size-[47.993px] top-0" data-name="Button">
      <Container9 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[1_0_0] h-[25.371px] min-h-px min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[21.333px] text-[rgba(10,10,10,0.5)] tracking-[0.6667px] whitespace-nowrap">输入您的回答...</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[31.982px] items-center left-[19.97px] overflow-clip top-[8.01px] w-[192.955px]" data-name="Container">
      <TextInput />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[12.494px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-7.7%_-16.65%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.67373 12.4952">
            <path d={svgPaths.p3692f000} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66731" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[12.494px] items-start left-[6.65px] top-[0.83px] w-[6.675px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[9.169px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[9.09%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-7.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3256 9.16812">
            <path d={svgPaths.p25f2e200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66634" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[9.169px] items-start left-[3.32px] top-[7.48px] w-[13.325px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[4.169px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20%] left-1/2 right-1/2 top-[20%]" data-name="Vector">
        <div className="absolute inset-[-33.03%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.65211 4.15341">
            <path d="M0.826056 0.826056V3.32735" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.65211" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col h-[4.169px] items-start left-[9.17px] top-[14.97px] w-[1.637px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute left-0 overflow-clip size-[19.975px] top-0" data-name="Container">
      <Container15 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[19.975px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[224.92px] size-[19.975px] top-[14px]" data-name="Button">
      <Container13 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[47.993px] left-0 top-0 w-[264.874px]" data-name="Container">
      <Container12 />
      <Button1 />
    </div>
  );
}

function Container18() {
  return <div className="absolute border-[#ecd1b4] border-[0.818px] border-solid h-[47.993px] left-0 rounded-[24px] top-0 w-[264.874px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] h-[47.993px] left-0 rounded-[24px] top-0 w-[264.874px]" data-name="Container">
      <Container11 />
      <Container18 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[47.993px] left-[16px] top-[16px] w-[320.858px]" data-name="Container">
      <Button />
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.75)] h-[79.988px] left-[19.99px] rounded-[24px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] top-[683.98px] w-[352.854px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[30px] left-0 top-0 w-[95.729px]" data-name="Paragraph">
      <p className="absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[30px] left-0 text-[24px] text-black top-[-3.46px] tracking-[0.67px] whitespace-nowrap">你好 CC!</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[30px] left-0 text-[24px] text-black top-[-3.46px] tracking-[0.67px] whitespace-nowrap">早上好！我是脉脉！</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[30.026px] items-start left-0 pt-[-3.453px] top-[37.97px] w-[221.983px]" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[67.993px] left-0 top-0 w-[221.983px]" data-name="Container">
      <Paragraph />
      <Container21 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[8.33%_12.43%]" data-name="Group">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0268 21.9907">
            <path d={svgPaths.p2c325200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99665 7.99665">
            <path d={svgPaths.p189a300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[23.99px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[11.99px] size-[23.99px] top-[11.99px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[47.993px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(236,209,180,0.8)] content-stretch flex flex-col items-start left-[302.85px] rounded-[12px] size-[47.993px] top-0" data-name="Button">
      <Container22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[67.993px] left-[21px] top-[27.98px] w-[350.846px]" data-name="Container">
      <Container20 />
      <Button2 />
    </div>
  );
}

function Container25() {
  return <div className="absolute bg-[#ecd1b4] h-[69.988px] left-[158px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.8px] w-[89.988px]" data-name="Container" />;
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[18.338px] items-start left-[14.99px] top-[18.98px] w-[31.33px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18.333px] min-h-px min-w-px relative text-[15px] text-black text-center tracking-[0.6667px]">计划</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[15.985px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.55%_5%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9104 16.0556">
            <path d={svgPaths.p5475900} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52408" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[15.985px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[22.66px] size-[15.985px] top-0" data-name="Container">
      <Container27 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[36.305px] left-[49.99px] top-[17.98px] w-[61.305px]" data-name="Button">
      <Paragraph2 />
      <Container26 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[17.698px] left-[9.32px] top-[28.52px] w-[31.33px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Lexend_Deca:Medium','Noto_Sans_KR:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[17.7px] left-[16.5px] text-[15px] text-black text-center top-[0.18px] tracking-[0.6667px] whitespace-nowrap">对话</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[18.568px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3786 17.0206">
            <path d={svgPaths.p1c845100} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.54732" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[15.7px] size-[18.568px] top-[3.76px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute left-[177.99px] size-[49.987px] top-[11px]" data-name="Button">
      <Paragraph3 />
      <Container28 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[18.338px] items-start left-[9.32px] top-[18.98px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18.333px] relative shrink-0 text-[15px] text-black text-center tracking-[0.6667px] whitespace-nowrap">商城</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[12.48%_58.38%_58.38%_12.48%]" data-name="Group">
      <div className="absolute inset-[12.48%_58.38%_58.38%_12.48%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99018 5.99018">
            <path d={svgPaths.p524f380} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33115" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[12.48%_8.38%_58.38%_62.48%]" data-name="Group">
      <div className="absolute inset-[12.48%_8.38%_58.38%_62.48%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99018 5.99018">
            <path d={svgPaths.p524f380} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33115" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[62.48%_58.38%_8.38%_12.48%]" data-name="Group">
      <div className="absolute inset-[62.48%_58.38%_8.38%_12.48%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99018 5.99018">
            <path d={svgPaths.p524f380} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33115" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[62.48%_8.38%_8.38%_62.48%]" data-name="Group">
      <div className="absolute inset-[62.48%_8.38%_8.38%_62.48%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99018 5.99018">
            <path d={svgPaths.p524f380} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33115" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[15.985px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[15.985px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16.99px] size-[15.985px] top-0" data-name="Container">
      <Container30 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[36.305px] left-[294.99px] top-[17.98px] w-[49.987px]" data-name="Button">
      <Paragraph4 />
      <Container29 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white border-[#f3f4f6] border-solid border-t-[0.818px] h-[69.988px] left-0 top-[781.99px] w-[392.841px]" data-name="Container">
      <Container25 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="4.1 未聊天状态">
      <Container />
      <Container1 />
      <Container2 />
      <Container7 />
      <Container19 />
      <Container24 />
    </div>
  );
}