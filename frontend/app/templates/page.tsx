import { Metadata } from 'next';
import { FactorsIndex } from '@/app/ui/factors/factors-index';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Templates page',
};

export default function Home() {
  const templates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
  ];

  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1">
          <h2>Template List</h2>
          {templates &&
            templates.map((template) => {
              return (
                <div key={template.id} className="">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {template.name}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex-1">
          <FactorsIndex />
        </div>
      </div>
    </>
  );
}
