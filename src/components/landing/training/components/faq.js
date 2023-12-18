'use client'
import React from 'react'
import FAQAccordion from './accordion'

const faqData = [
  {
    question: 'ስልጠናው ኦንላይን ነው ወይስ በአካል ነው?',
    answer: 'ስልጠናው በአካል በክፍል ውስጥ የሚሰጥ ሲሆን መገናኛ (አዲስ አበባ) አካባቢ በሚገኘው የተሟላ የኮሚፒውተር ማዕከላችን ይካሄዳል። ኦንላይን የሚሰጡ ስልጠናዎቻችን ላይ ለመሳተፍ www.siltena.com ላይ ይከታተሉ።'
  },
  {
    question: 'በክፍያ ነው ወይስ በነፃ?',
    answer: 'በተለየ ሁኔታ ካልተገዘፀ በስተቀር ስልጠናዎቻችን በሙሉ በክፍያ የሚካሄዱ ናቸው።'
  },
  {
    question: 'ስልጠናውን ሳጠናቅቅ ሰርተፍኬት አገኛለሁ?',
    answer: 'አዎ ስልጠናውን በሚገባ ተከታትለው፣ እንዲሁም ለኮርሱ ማሟያ የሚጠየቁ መስፈርቶችን በተገቢው ሁኔታ ላጠናቀቁ ይሄንኑ የሚገልፅ ሰርተፍኬት ይሰጣል።'
  },
  {
    question: 'ለምን እናንተ ጋር እማራለሁ? ለምን ሌላ ቦታ አልሄድም?',
    answer: 'ጎበዜ ስራ ላይ ባሉ ባለሙያዎች ወድያው መተግበር በሚያስችል መልኩ የሚቀርቡ ስልጠናዎች የሚሰጥበት ማዕከል ሲሆን ላለፉት አምስት ዓመታት ሺዎች በምንሰጣቸው ፕሮግራሞች ተጠቃሚ መሆናቸው እንዲሁም ስልጠናው ካለቀ በኋላ የሚዘልቅ ትስስር የሚፈጠርበት ቦታ መሆኑ ተመራጭ ያደርገዋል።'
  },
  // Add more FAQ items as needed
];

const FAQ = () => {
  return (
    <div name="FAQ" className=' h-screen grid lg:grid-cols-8 text-black md:py-20 px-10'>
      <div className='lg:col-span-2'></div>
      <div className='lg:col-span-5'>
        <h1 className="text-2xl md:text-3xl font-bold mb-10 ">FAQ - በደምበኞች ህሊና ሊመጡ የሚችሉ ጥያቄዎች</h1>
        <FAQAccordion faqData={faqData} />
        <div className='text-center md:my-20 my-28 '>
          <a href="https://t.me/HelloGobeze" className='bg-orange-400 text-white font-semibold md:text-lg md:px-10 md:py-6 px-6 py-4 rounded-md '>
          Speak With Admission
          </a>
        </div>
      </div>
        
      </div>
  )
}

export default FAQ


