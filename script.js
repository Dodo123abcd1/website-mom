const menuButton = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const languageSelect = document.querySelector('#language-select');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

const originalText = new Map([...document.querySelectorAll('[data-i18n]')].map((element) => [element.dataset.i18n, element.innerHTML]));
const originalPlaceholders = new Map([...document.querySelectorAll('[data-i18n-placeholder]')].map((element) => [element.dataset.i18nPlaceholder, element.getAttribute('placeholder')]));
const originalAria = new Map([...document.querySelectorAll('[data-i18n-aria]')].map((element) => [element.dataset.i18nAria, element.getAttribute('aria-label')]));

const translations = {
  th: {
    pauseAnimation: 'หยุดภาพเคลื่อนไหวชั่วคราว',
    brandHome: 'หน้าแรก Goodground', navApproach: 'แนวทางของเรา', navProducts: 'ผลิตภัณฑ์', navStories: 'เรื่องเล่าจากผู้ปลูก', headerCta: 'เลือกสูตรที่ใช่ <span aria-hidden="true">↗</span>', menuOpen: 'เปิดเมนู', menuClose: 'ปิดเมนู',
    heroKicker: 'เริ่มต้นจากดินที่ดี', heroTitle: 'บำรุงดินให้ดี<br />เพื่อทุกการ <em>เติบโต</em><br />อย่างงดงาม', heroLede: 'ธาตุอาหารพืชที่ใส่ใจ เพื่อสวนที่เติบโตอย่างสมดุล พบกับปุ๋ย 2 สูตรที่ช่วยให้พืชแข็งแรงตั้งแต่รากถึงยอด', heroCta: 'เลือกสูตรที่เหมาะ <span aria-hidden="true">↓</span>', heroNote: 'ใส่ใจธรรมชาติ<br />ใช้ได้จริงในทุกวัน', heroArt: 'ภาพประกอบสวนที่อุดมสมบูรณ์และถุงปุ๋ย', packSeal: 'GOOD<br />GROUND', packName: 'สูตร<br />ครบครัน', packCaption: 'สูตรอินทรีย์<br />1 กก. · สำหรับสวน', artTop: 'ปลูก<br />ด้วยใจ', artBottom: 'หมายเลข 01 / สูตรบำรุงสวน', heroBottomLeft: 'สิ่งดี ๆ เติบโตจากดินที่ดี', heroBottomRight: 'เริ่มต้นจากใจรักการปลูก <b>✳</b>',
    introKicker: '01 / การเติบโตที่ดีกว่า', introTitle: 'พืชเติบโตได้ดี<br />เมื่อดินแข็งแรง', introLead: 'การปลูกให้ได้ผลดีไม่ใช่การเติมทุกอย่างให้มากขึ้น แต่คือการเติมสิ่งที่ดินต้องการ ให้เหมาะกับพืชและพื้นที่ของคุณ', introText: 'Goodground มีปุ๋ย 2 สูตรที่เลือกใช้ได้ง่าย: สูตรอินทรีย์เพื่อบำรุงดิน และสูตรแร่ธาตุเพื่อเสริมธาตุอาหารให้พืชอย่างตรงจุด', introLink: 'ค้นหาวิธีปลูกที่เหมาะกับคุณ <span>↗</span>', statOne: '2 สูตร เลือกง่าย', statTwo: '1 นิสัยการปลูกที่ดีต่อดิน', statThree: 'เติบโตได้อีกหลากหลาย',
    productsKicker: '02 / รู้จักปุ๋ยทั้งสองสูตร', productsTitle: 'สองทางเลือก<br /><em>เพื่อการเติบโต</em>', productsIntro: 'เลือกการบำรุงที่เหมาะกับดินและพืชของคุณ', organicPack: 'ปุ๋ย<br />อินทรีย์', organicPackTag: 'บำรุงจากรากฐานของดิน', organicVisual: 'เพื่อดินที่มีชีวิต', organicType: 'ผู้บำรุงดิน', organicName: 'ปุ๋ยอินทรีย์', organicDesc: 'ส่วนผสมจากธรรมชาติที่ช่วยบำรุงดินและส่งเสริมการเติบโตอย่างค่อยเป็นค่อยไป', organicBenefit1: 'ช่วยเพิ่มความสมบูรณ์ของดิน', organicBenefit2: 'เหมาะกับแปลงปลูก กระถาง และสวนทั่วไป', organicBenefit3: 'ให้ธาตุอาหารอย่างต่อเนื่อง', organicLink: 'ดูสูตรอินทรีย์ <span>↗</span>', mineralPack: 'ปุ๋ย<br />แร่ธาตุ', mineralPackTag: 'เสริมแรงให้การเติบโต', mineralVisual: 'สำหรับการบำรุงอย่างตรงจุด', mineralType: 'ตัวช่วยบำรุงพืช', mineralName: 'ปุ๋ยแร่ธาตุ', mineralDesc: 'แหล่งธาตุอาหารแร่ธาตุที่สมดุลและควบคุมปริมาณได้ เพื่อเสริมธาตุอาหารให้พืชตามช่วงเวลาที่เหมาะสม', mineralBenefit1: 'เสริมธาตุอาหารอย่างตรงจุด', mineralBenefit2: 'เหมาะกับพืชที่กำลังเติบโตและต้องการอาหาร', mineralBenefit3: 'มีคำแนะนำการใช้งานที่เข้าใจง่าย', mineralLink: 'ดูสูตรแร่ธาตุ <span>↗</span>', finePrint: 'โปรดปฏิบัติตามคำแนะนำบนฉลากผลิตภัณฑ์เสมอ สูตรและอัตราการใช้อาจแตกต่างกันตามชนิดพืชและสภาพดิน',
    manifestoStamp: 'ปลูก<br />ด้วย<br />ความใส่ใจ', manifestoKicker: 'ดินดี การปลูกก็ดี', manifestoTitle: 'ดูแลดินให้ดี<br /><em>สิ่งอื่นจะตามมา</em>', manifestoText: 'การปลูกให้แข็งแรงเริ่มต้นใต้ผิวดิน เราเชื่อว่าผลิตภัณฑ์ที่ดีควรใช้เข้าใจง่าย ใส่ใจในรายละเอียด และเป็นมิตรกับพื้นที่ที่เราเพาะปลูก', manifestoCta: 'มาเติบโตไปด้วยกัน <span>↗</span>',
    featuresKicker: '03 / แนวทาง Goodground', featuresTitle: 'ปลูกให้ดี<br /><em>ได้ง่ายขึ้น</em>', featuresIntro: 'ไม่ว่าจะเป็นต้นมะเขือเทศต้นแรกหรือฤดูเก็บเกี่ยวครั้งที่ห้าสิบ ความเข้าใจที่ชัดเจนช่วยได้เสมอ', featureTitle1: 'รู้ว่ากำลัง<br />บำรุงอะไร', featureText1: 'ปุ๋ย 2 สูตรที่ชัดเจน ช่วยให้เลือกการบำรุงที่เหมาะกับสวนของคุณได้ง่ายขึ้น', featureTitle2: 'เติบโต<br />ในจังหวะของคุณ', featureText2: 'คำแนะนำที่เข้าใจง่ายช่วยให้คุณดูแลสวนได้เป็นประจำ โดยไม่ทำให้ยุ่งยากเกินไป', featureTitle3: 'เพิ่มพื้นที่<br />ให้ชีวิตเติบโต', featureText3: 'ธาตุอาหารที่ใส่ใจช่วยให้พืชแข็งแรงและพื้นที่ปลูกมีชีวิตชีวามากขึ้น',
    quoteLabel: 'จากชุมชนคนรักการปลูก', quoteText: '“สิ่งที่ดีที่สุดคือรู้ว่าควรเลือกใช้อะไร สมุนไพรของฉันกำลังงอกงาม และฉันได้เรียนรู้เรื่องดินของตัวเองมากขึ้นทุกฤดู”', quoteRole: 'คนทำสวนที่บ้าน · เชียงใหม่', contactKicker: '04 / เริ่มต้นฤดูปลูกที่ดีครั้งต่อไป', contactTitle: 'มาเริ่มปลูก<br /><em>สิ่งดี ๆ</em> ด้วยกัน', contactText: 'บอกเราว่าคุณกำลังปลูกอะไร แล้วเราจะช่วยแนะนำจุดเริ่มต้นที่เหมาะกับคุณ', contactNote: 'มีคำถามเกี่ยวกับการเลือกสูตรไหม?<br />เรายินดีช่วยคุณ', formName: 'ชื่อของคุณ', formNamePlaceholder: 'อยากให้เราเรียกคุณว่าอะไร', formEmail: 'อีเมล', formGrowing: 'คุณกำลังปลูกอะไรอยู่', formGrowingPlaceholder: 'สวน ไร่ หรือกระถางเล็ก ๆ ที่ระเบียง…', formSubmit: 'ติดต่อเรา <span>↗</span>', formPrivacy: 'แบบฟอร์มตัวอย่างนี้ยังไม่ส่งหรือจัดเก็บข้อมูลของคุณ', formSuccess: 'ขอบคุณที่ติดต่อเรา แบบฟอร์มตัวอย่างนี้พร้อมเชื่อมต่อกับอีเมลของคุณแล้ว', footerTagline: 'บำรุงสิ่งดี ๆ ให้เติบโตในทุกพื้นที่', footerContact: 'ติดต่อเรา', footerClose: 'เติบโตอย่างงดงาม'
  },
  lo: {
    pauseAnimation: 'ຢຸດພາບເຄື່ອນໄຫວຊົ່ວຄາວ',
    brandHome: 'ໜ້າຫຼັກ Goodground', navApproach: 'ແນວທາງຂອງພວກເຮົາ', navProducts: 'ຜະລິດຕະພັນ', navStories: 'ເລື່ອງຈາກຜູ້ປູກ', headerCta: 'ເລືອກສູດທີ່ເໝາະ <span aria-hidden="true">↗</span>', menuOpen: 'ເປີດເມນູ', menuClose: 'ປິດເມນູ',
    heroKicker: 'ເລີ່ມຕົ້ນຈາກດິນທີ່ດີ', heroTitle: 'ບຳລຸງດິນໃຫ້ດີ<br />ເພື່ອທຸກການ <em>ເຕີບໃຫຍ່</em><br />ຢ່າງງົດງາມ', heroLede: 'ສານອາຫານພືດທີ່ໃສ່ໃຈ ເພື່ອສວນທີ່ເຕີບໂຕຢ່າງສົມດຸນ. ພົບກັບປຸ໋ຍ 2 ສູດທີ່ຊ່ວຍໃຫ້ພືດແຂງແຮງຕັ້ງແຕ່ຮາກຈົນເຖິງຍອດ', heroCta: 'ເລືອກສູດທີ່ເໝາະ <span aria-hidden="true">↓</span>', heroNote: 'ໃສ່ໃຈທຳມະຊາດ<br />ໃຊ້ໄດ້ຈິງທຸກມື້', heroArt: 'ຮູບປະກອບສວນທີ່ອຸດົມສົມບູນ ແລະ ຖົງປຸ໋ຍ', packSeal: 'GOOD<br />GROUND', packName: 'ສູດ<br />ຄົບຖ້ວນ', packCaption: 'ສູດອິນຊີ<br />1 ກິໂລ · ສຳລັບສວນ', artTop: 'ປູກ<br />ດ້ວຍໃຈ', artBottom: 'ເລກ 01 / ສູດບຳລຸງສວນ', heroBottomLeft: 'ສິ່ງດີໆ ເລີ່ມເຕີບໂຕຈາກດິນທີ່ດີ', heroBottomRight: 'ເລີ່ມຕົ້ນຈາກໃຈຮັກການປູກ <b>✳</b>',
    introKicker: '01 / ການເຕີບໂຕທີ່ດີຂຶ້ນ', introTitle: 'ພືດເຕີບໂຕດີ<br />ເມື່ອດິນແຂງແຮງ', introLead: 'ການປູກໃຫ້ໄດ້ຜົນດີບໍ່ແມ່ນການເພີ່ມທຸກຢ່າງໃຫ້ຫຼາຍຂຶ້ນ. ແຕ່ແມ່ນການເພີ່ມສິ່ງທີ່ດິນຕ້ອງການ ໃຫ້ເໝາະກັບພືດ ແລະ ພື້ນທີ່ຂອງທ່ານ', introText: 'Goodground ມີປຸ໋ຍ 2 ສູດທີ່ເລືອກໃຊ້ໄດ້ງ່າຍ: ສູດອິນຊີເພື່ອບຳລຸງດິນ ແລະ ສູດແຮ່ທາດເພື່ອເພີ່ມສານອາຫານໃຫ້ພືດຢ່າງຕົງຈຸດ', introLink: 'ຊອກຫາວິທີປູກທີ່ເໝາະກັບທ່ານ <span>↗</span>', statOne: '2 ສູດ ເລືອກງ່າຍ', statTwo: '1 ນິໄສການປູກທີ່ດີຕໍ່ດິນ', statThree: 'ເຕີບໂຕໄດ້ອີກຫຼາຍຮູບແບບ',
    productsKicker: '02 / ຮູ້ຈັກປຸ໋ຍທັງສອງສູດ', productsTitle: 'ສອງທາງເລືອກ<br /><em>ເພື່ອການເຕີບໂຕ</em>', productsIntro: 'ເລືອກການບຳລຸງທີ່ເໝາະກັບດິນ ແລະ ພືດຂອງທ່ານ', organicPack: 'ປຸ໋ຍ<br />ອິນຊີ', organicPackTag: 'ບຳລຸງຈາກພື້ນຖານຂອງດິນ', organicVisual: 'ສຳລັບດິນທີ່ມີຊີວິດ', organicType: 'ຕົວບຳລຸງດິນ', organicName: 'ປຸ໋ຍອິນຊີ', organicDesc: 'ສ່ວນປະສົມຈາກທຳມະຊາດທີ່ຊ່ວຍບຳລຸງດິນ ແລະ ສົ່ງເສີມການເຕີບໂຕຢ່າງຄ່ອຍເປັນຄ່ອຍໄປ', organicBenefit1: 'ຊ່ວຍເພີ່ມຄວາມອຸດົມສົມບູນຂອງດິນ', organicBenefit2: 'ເໝາະສຳລັບແປງປູກ, ກະຖາງ ແລະ ສວນທົ່ວໄປ', organicBenefit3: 'ໃຫ້ສານອາຫານຢ່າງຕໍ່ເນື່ອງ', organicLink: 'ເບິ່ງສູດອິນຊີ <span>↗</span>', mineralPack: 'ປຸ໋ຍ<br />ແຮ່ທາດ', mineralPackTag: 'ເສີມແຮງໃຫ້ການເຕີບໂຕ', mineralVisual: 'ສຳລັບການບຳລຸງຢ່າງຕົງຈຸດ', mineralType: 'ຕົວຊ່ວຍບຳລຸງພືດ', mineralName: 'ປຸ໋ຍແຮ່ທາດ', mineralDesc: 'ແຫຼ່ງສານອາຫານແຮ່ທາດທີ່ສົມດຸນ ແລະ ຄວບຄຸມປະລິມານໄດ້ ເພື່ອເສີມສານອາຫານໃຫ້ພືດໃນເວລາທີ່ເໝາະສົມ', mineralBenefit1: 'ເສີມສານອາຫານຢ່າງຕົງຈຸດ', mineralBenefit2: 'ເໝາະກັບພືດທີ່ກຳລັງເຕີບໂຕ ແລະ ຕ້ອງການສານອາຫານ', mineralBenefit3: 'ມີຄຳແນະນຳການໃຊ້ທີ່ເຂົ້າໃຈງ່າຍ', mineralLink: 'ເບິ່ງສູດແຮ່ທາດ <span>↗</span>', finePrint: 'ກະລຸນາປະຕິບັດຕາມຄຳແນະນຳເທິງສະຫຼາກຜະລິດຕະພັນສະເໝີ. ສູດ ແລະ ອັດຕາການໃຊ້ອາດແຕກຕ່າງຕາມຊະນິດພືດ ແລະ ສະພາບດິນ',
    manifestoStamp: 'ປູກ<br />ດ້ວຍ<br />ຄວາມ<br />ໃສ່ໃຈ', manifestoKicker: 'ດິນດີ ການປູກກໍດີ', manifestoTitle: 'ເບິ່ງແຍງດິນໃຫ້ດີ<br /><em>ສິ່ງອື່ນຈະຕາມມາ</em>', manifestoText: 'ການປູກໃຫ້ແຂງແຮງເລີ່ມຕົ້ນຢູ່ໃຕ້ຜິວດິນ. ພວກເຮົາເຊື່ອວ່າຜະລິດຕະພັນທີ່ດີຄວນໃຊ້ງ່າຍ ໃສ່ໃຈໃນລາຍລະອຽດ ແລະ ເປັນມິດກັບພື້ນທີ່ປູກ', manifestoCta: 'ມາເຕີບໂຕໄປນຳກັນ <span>↗</span>',
    featuresKicker: '03 / ແນວທາງ Goodground', featuresTitle: 'ປູກໃຫ້ດີ<br /><em>ໄດ້ງ່າຍຂຶ້ນ</em>', featuresIntro: 'ບໍ່ວ່າຈະເປັນຕົ້ນໝາກເລັ່ນຕົ້ນທຳອິດ ຫຼື ລະດູເກັບກ່ຽວຄັ້ງທີຫ້າສິບ ຄວາມເຂົ້າໃຈທີ່ຊັດເຈນຊ່ວຍໄດ້ສະເໝີ', featureTitle1: 'ຮູ້ວ່າກຳລັງ<br />ບຳລຸງຫຍັງ', featureText1: 'ປຸ໋ຍ 2 ສູດທີ່ຊັດເຈນ ຊ່ວຍໃຫ້ເລືອກການບຳລຸງທີ່ເໝາະກັບສວນຂອງທ່ານໄດ້ງ່າຍຂຶ້ນ', featureTitle2: 'ເຕີບໂຕ<br />ຕາມຈັງຫວະຂອງທ່ານ', featureText2: 'ຄຳແນະນຳທີ່ເຂົ້າໃຈງ່າຍຊ່ວຍໃຫ້ທ່ານດູແລສວນໄດ້ເປັນປະຈຳ ໂດຍບໍ່ເຮັດໃຫ້ຫຍຸ້ງຍາກເກີນໄປ', featureTitle3: 'ເພີ່ມພື້ນທີ່<br />ໃຫ້ຊີວິດເຕີບໂຕ', featureText3: 'ສານອາຫານທີ່ໃສ່ໃຈຊ່ວຍໃຫ້ພືດແຂງແຮງ ແລະ ພື້ນທີ່ປູກມີຊີວິດຊີວາຂຶ້ນ',
    quoteLabel: 'ຈາກຊຸມຊົນຄົນຮັກການປູກ', quoteText: '“ສິ່ງທີ່ດີທີ່ສຸດແມ່ນຮູ້ວ່າຄວນເລືອກໃຊ້ຫຍັງ. ສະໝຸນໄພຂອງຂ້ອຍກຳລັງງອກງາມ ແລະ ຂ້ອຍກໍຮຽນຮູ້ເລື່ອງດິນຂອງຕົນເອງຫຼາຍຂຶ້ນໃນທຸກລະດູ”', quoteRole: 'ຄົນເຮັດສວນຢູ່ບ້ານ · ຊຽງໃໝ່', contactKicker: '04 / ເລີ່ມລະດູປູກທີ່ດີຄັ້ງຕໍ່ໄປ', contactTitle: 'ມາເລີ່ມປູກ<br /><em>ສິ່ງດີໆ</em> ນຳກັນ', contactText: 'ບອກພວກເຮົາວ່າທ່ານກຳລັງປູກຫຍັງ ແລ້ວພວກເຮົາຈະຊ່ວຍແນະນຳຈຸດເລີ່ມຕົ້ນທີ່ເໝາະສົມ', contactNote: 'ມີຄຳຖາມເລື່ອງການເລືອກສູດບໍ?<br />ພວກເຮົາຍິນດີຊ່ວຍ', formName: 'ຊື່ຂອງທ່ານ', formNamePlaceholder: 'ຢາກໃຫ້ເອີ້ນທ່ານວ່າແນວໃດ', formEmail: 'ອີເມວ', formGrowing: 'ທ່ານກຳລັງປູກຫຍັງຢູ່?', formGrowingPlaceholder: 'ສວນ ໄຮ່ ຫຼື ກະຖາງນ້ອຍໆຢູ່ລະບຽງ…', formSubmit: 'ຕິດຕໍ່ພວກເຮົາ <span>↗</span>', formPrivacy: 'ແບບຟອມຕົວຢ່າງນີ້ຍັງບໍ່ສົ່ງ ຫຼື ຈັດເກັບຂໍ້ມູນຂອງທ່ານ', formSuccess: 'ຂອບໃຈທີ່ຕິດຕໍ່ມາ. ແບບຟອມຕົວຢ່າງນີ້ພ້ອມເຊື່ອມຕໍ່ກັບອີເມວຂອງທ່ານແລ້ວ', footerTagline: 'ບຳລຸງສິ່ງດີໆໃຫ້ເຕີບໂຕໃນທຸກພື້ນທີ່', footerContact: 'ຕິດຕໍ່ພວກເຮົາ', footerClose: 'ເຕີບໂຕຢ່າງງົດງາມ'
  }
};

function setLanguage(language) {
  const locale = translations[language];
  document.documentElement.lang = language;
  languageSelect.value = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.innerHTML = locale?.[key] ?? originalText.get(key) ?? element.innerHTML;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute('placeholder', locale?.[key] ?? originalPlaceholders.get(key) ?? '');
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const key = element.dataset.i18nAria;
    element.setAttribute('aria-label', locale?.[key] ?? originalAria.get(key) ?? '');
  });
  menuButton.setAttribute('aria-label', translations[language]?.[header.classList.contains('menu-open') ? 'menuClose' : 'menuOpen'] ?? (header.classList.contains('menu-open') ? 'Close navigation' : 'Open navigation'));
  const description = document.querySelector('meta[name="description"]');
  const pageTitles = { en: 'POWDER PLANT — PSK2005', th: 'POWDER PLANT — PSK2005', lo: 'POWDER PLANT — PSK2005' };
  const descriptions = { en: 'Meet Goodground: two thoughtful fertilizers for stronger roots, healthier soil, and thriving gardens.', th: 'พบกับ Goodground ปุ๋ย 2 สูตรที่ใส่ใจ เพื่อรากที่แข็งแรง ดินที่สมบูรณ์ และสวนที่งอกงาม', lo: 'ພົບກັບ Goodground: ປຸ໋ຍ 2 ສູດທີ່ໃສ່ໃຈ ເພື່ອຮາກທີ່ແຂງແຮງ ດິນທີ່ອຸດົມສົມບູນ ແລະ ສວນທີ່ງອກງາມ' };
  document.title = pageTitles[language] ?? pageTitles.en;
  description.content = descriptions[language] ?? descriptions.en;
  if (formStatus.dataset.submitted === 'true') formStatus.textContent = locale?.formSuccess ?? 'Thanks for reaching out — this demo form is ready to connect to your inbox.';
  try { localStorage.setItem('goodground-language', language); } catch { /* Storage may be unavailable in private browsing. */ }
}

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', translations[document.documentElement.lang]?.[open ? 'menuClose' : 'menuOpen'] ?? (open ? 'Close navigation' : 'Open navigation'));
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
document.querySelector('#year').textContent = new Date().getFullYear();
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('goodground-language') || 'en'; } catch { /* Storage may be unavailable in private browsing. */ }
setLanguage(savedLanguage);

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.dataset.submitted = 'true';
  formStatus.textContent = translations[document.documentElement.lang]?.formSuccess ?? 'Thanks for reaching out — this demo form is ready to connect to your inbox.';
});

const motionToggle = document.querySelector('.motion-toggle');
motionToggle.addEventListener('click', () => {
  const paused = document.querySelector('.product-showcase').classList.toggle('motion-paused');
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
});
