'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Motivator, Stressor } from '@prisma/client';
import { CopingFactorsIndex } from './coping-factors-index';
import { CopingTextArea } from './coping-text-area';

export const CopingFactors = () => {
  const searchParams = useSearchParams();
  const factorsSetName = searchParams.get('name');

  const [selectedFactor, setSelectedFactor] = useState<
    Motivator | Stressor | null
  >(null);
  const resultRef = useRef<string>(
    '対策を提案してほしい要因をクリックしてください。',
  );

  const handleFactorSelect = (factor: Motivator | Stressor) => {
    setSelectedFactor(factor);
  };

  useEffect(() => {
    const fetchFactors = async () => {
      if (selectedFactor) {
        const genAI = new GoogleGenerativeAI(
          `${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        );

        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction:
            '- 出力形式：「対策」。- HTMLタグで出力する（HTMLであることを明示する表記は除く）。- 簡潔に説明。- 箇条書きで項目を4つにする。- 箇条書きの対策のみを出力する。',
        });

        const prompt = `${factorsSetName}を行う上で、${selectedFactor.name}に対しストレスに感じています。これにはどのように対策ができますか？`;

        const result = await model.generateContent(prompt);
        resultRef.current = result.response.text();
      }
    };

    fetchFactors();
  }, [selectedFactor, factorsSetName]);

  return (
    <>
      <div className="flex grow flex-row space-x-2 pt-24 h-3/6">
        <div className="flex-1">
          <CopingFactorsIndex onFactorSelect={handleFactorSelect} />
        </div>
        <div className="flex-1">
          <CopingTextArea text={resultRef.current} />
        </div>
      </div>
    </>
  );
};
