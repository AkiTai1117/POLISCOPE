export const QUESTIONS_PER_PAGE = 10;

export type Question = {
  id: number;
  text: string;
  direction: -1 | 1;
};

export const QUESTIONS: Question[] = [
  { id: 1, text: "所得が高い人ほど、より多くの税を負担するべきだ", direction: -1 },
  { id: 2, text: "経済成長のためには、企業への規制をできるだけ減らすべきだ", direction: 1 },
  { id: 3, text: "医療や福祉は、市場競争よりも公的な支援を重視するべきだ", direction: -1 },
  { id: 4, text: "国の伝統や文化は、社会の変化より優先して守るべきだ", direction: 1 },
  { id: 5, text: "最低賃金は、企業への負担が増えても引き上げるべきだ", direction: -1 },
  { id: 6, text: "国防のためであれば、防衛費の増加は必要だ", direction: 1 },
  { id: 7, text: "教育にかかる家庭の負担は、税金でさらに軽くするべきだ", direction: -1 },
  { id: 8, text: "公共サービスの一部は、民間企業に任せた方が効率的だ", direction: 1 },
  { id: 9, text: "環境保護のためなら、企業活動への規制強化もやむを得ない", direction: -1 },
  { id: 10, text: "治安維持のため、監視カメラの設置をさらに進めるべきだ", direction: 1 },
  { id: 11, text: "生活に必要な最低限の所得を国が保障する考えに賛成だ", direction: -1 },
  { id: 12, text: "努力した人がより大きな報酬を得る格差は、ある程度必要だ", direction: 1 },
  { id: 13, text: "労働者の権利を守るため、解雇に関する規制は厳しくするべきだ", direction: -1 },
  { id: 14, text: "国の重要な政策では、専門家より国民投票を重視するべきだ", direction: 1 },
  { id: 15, text: "住宅は投資対象である前に、生活の基盤として保障されるべきだ", direction: -1 },
  { id: 16, text: "国際競争力を高めるため、法人税は低く抑えるべきだ", direction: 1 },
  { id: 17, text: "社会的な少数派を守るため、制度上の配慮を増やすべきだ", direction: -1 },
  { id: 18, text: "犯罪に対する刑罰は、現在より厳しくするべきだ", direction: 1 },
  { id: 19, text: "鉄道や水道などの重要インフラは、公的に運営する方がよい", direction: -1 },
  { id: 20, text: "社会保障よりも、自助努力を促す政策を優先するべきだ", direction: 1 },
  { id: 21, text: "気候変動への対策は、経済的な負担があっても急ぐべきだ", direction: -1 },
  { id: 22, text: "地域や家族による助け合いは、行政の支援より重要だ", direction: 1 },
  { id: 23, text: "大学までの教育を、原則として無償に近づけるべきだ", direction: -1 },
  { id: 24, text: "国益を守るためには、国際協調より独自の判断を優先するべきだ", direction: 1 },
  { id: 25, text: "大企業の市場独占を防ぐため、政府はより積極的に介入するべきだ", direction: -1 },
  { id: 26, text: "移民の受け入れは、社会への影響を考えて慎重に進めるべきだ", direction: 1 },
  { id: 27, text: "育児や介護は、家庭だけでなく社会全体で支えるべきだ", direction: -1 },
  { id: 28, text: "公共の秩序を守るためなら、個人の自由が一部制限されることもある", direction: 1 },
  { id: 29, text: "電気・ガスなど生活必需サービスの料金は、国が強く管理するべきだ", direction: -1 },
  { id: 30, text: "景気対策では、政府支出より民間投資を促す政策を優先するべきだ", direction: 1 },
];

export const ANSWER_OPTIONS = [
  { label: "強く反対", value: -2 },
  { label: "反対", value: -1 },
  { label: "どちらでもない", value: 0 },
  { label: "賛成", value: 1 },
  { label: "強く賛成", value: 2 },
] as const;
