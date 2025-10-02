

import React, { ReactNode } from 'react';

type InfoBoxProps = {
  children: ReactNode;
  heading?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo?: { text: string; link: string; style?: string };
};

const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  heading,
  backgroundColor = 'bg-grey-100',
  textColor = 'text-grey-800',
  buttonInfo
}) => {
  return (
     <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <a
              href={`${buttonInfo?.link}`}
              className={`inline-block ${buttonInfo?.style} text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
             {buttonInfo?.text}
            </a>
          </div>
  );
};

export default InfoBox;

