"use client";

import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {ArrowRight} from "lucide-react";0
import {cn} from "@/lib/utils";

interface AccordionContextType {
    selected: string | null,
    setSelected: React.Dispatch<React.SetStateAction<string | null>>
}

type AccordionProps = {
    children: React.ReactNode;
    value?: string;
    onChange?: (value: string | null) => void;
} & React.HTMLAttributes<HTMLUListElement>;

type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value: string;
    trigger: string;
} & React.HTMLAttributes<HTMLLIElement>;

const AccordionContext = createContext<AccordionContextType | null>(null);

export function Accordion({children, value, onChange, ...props} : AccordionProps) {
    const [selected, setSelected] = useState<string | null>(value || null);

    useEffect(() => {
        onChange?.(selected);
    }, [selected, onChange]);

    return (
        <ul {...props}>
            <AccordionContext.Provider value={{ selected, setSelected }}>
                {children}
            </AccordionContext.Provider>
        </ul>
    )
}

export function AccordionItem({children, className, value, trigger, ...props}: AccordionItemProps) {

    const context = useContext(AccordionContext);
    if (!context) throw new Error('AccordionItem must be used within an accordion');

    const { selected, setSelected } = context;
    const open: boolean = selected === value

    const ref = useRef<HTMLDivElement>(null);

  return (
      <li className={cn(
          `border-b bg-white shadow-[0_4px_4px_rgba(0,_0,_0,_10%),inset_0_-3px_#7CBA5A] rounded-[14px] before:`,
          className,
          )} {...props}
          onMouseLeave={() => setSelected(null)}>
          <header
              role="button"
              onClick={() => setSelected(open ? null : value)}
              className={cn(
                  `flex justify-between items-center py-[10px] px-[20px] text-blue-main font-bold transition-all duration-300 border-b border-b-transparent`,
                  { 'border-blue-950': open },
              )}
          >
              <span className={'flex items-center gap-4'}>
                <span className={'text-2xl'}>{value}</span> {trigger}
              </span>

              <ArrowRight
                  size={18}
                  className={`transition-transform ${open ? "rotate-90": ""}`}
              />
          </header>
          <div
              className="overflow-y-hidden transition-all duration-300"
              style={{height: open ? ref.current?.offsetHeight || 0 : 0}}
          >
              <div className="pt-2 py-4 px-10" ref={ref}>
                  {children}
              </div>
          </div>
      </li>
  )
}