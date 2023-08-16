const commitTypes = [
  {
    key: 'build', // Commit 類型的代碼
    description: '打包系統 (Build System)', // Commit 類型的描述
    emoji: '📦', // Commit 類型的 emoji
    value: 'build', // Commit 類型的值
  },
  {
    key: 'chore',
    description: '增加或修改第三方套件(輔助工具)等 (maintain)',
    emoji: '🚀',
    value: 'chore',
  },
  {
    key: 'ci',
    description: 'CI 相關更動(Continuous Integration)',
    emoji: '👷',
    value: 'ci',
  },
  {
    key: 'docs',
    description: '修改/新增文件 (documentation)',
    emoji: '✏️',
    value: 'docs',
  },
  {
    key: 'feat',
    description: '新增/修改功能 (Feature)',
    emoji: '✨',
    value: 'feat',
  },
  {
    key: 'fix',
    description: '修正 Bug (bug fix)',
    emoji: '🐛',
    value: 'fix',
  },
  {
    key: 'perf',
    description: '提高效能的程式碼修正',
    emoji: '⚡️',
    value: 'perf',
  },
  {
    key: 'refactor',
    description: '重構 or 優化，不屬於 bug 也不屬於新增功能等',
    emoji: '💡',
    value: 'refactor',
  },
  {
    key: 'release',
    description: '新增正式釋出的 release commit 訊息',
    emoji: '🏹',
    value: 'release',
  },
  {
    key: 'revert',
    description: '還原先前的 commit',
    emoji: '⏪',
    value: 'revert',
  },
  {
    key: 'style',
    description:
      '修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)',
    emoji: '💄',
    value: 'style',
  },
  {
    key: 'test',
    description: '增加測試功能 (when adding missing tests)',
    emoji: '💍',
    value: 'test',
  },
  {
    key: 'wip',
    description: '尚未完成的工作 (work in progress)',
    emoji: '🚧',
    value: 'wip',
  },
];

const messages = {
  // Commit 的提示訊息描述
  type: '<type> 用於說明 Commit 的類別，請選擇您要 Commit 的類型(必選)：',
  customScope: '<scope> 自定義影響範圍，請精簡扼要但不失原意，(可選，若無，請按 Enter 略過):',
  subject: '<subject> 目的簡短描述 Commit 的修正範圍(必填)：\n',
  body: '<body> 對本次 commit 的詳細描述，使用第一人稱，應該說明代碼變動的動機，以及與以前行為的對比，可以使用 "|" 分成多行，(可選，若無，請按 Enter 略過):\n ',
  breaking:
    '<breaking> 對破壞性變動(Breaking Change)的描述、以及變動理由和遷移方法，(可選，若無，請按 Enter 略過):\n',
  footer: '<footer> 針對的 issue，像是：#520, #1314 (可選，若無，請按 Enter 略過):',
  confirmCommit: '<confirm commit> 請確認本次 Commit 描述。\n',
};

module.exports = {
  disableEmoji: false, // 是否禁用 emoji
  format: '{type}{scope}: {emoji}{subject}', // Commit 訊息的格式
  list: commitTypes.map((type) => type.key), // Commit 類型的清單
  maxMessageLength: 64, // Commit 訊息的最大長度
  minMessageLength: 3, // Commit 訊息的最小長度
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'], // 問題的清單
  scopes: [], // Commit 範圍的清單
  types: commitTypes.reduce((acc, type) => {
    acc[type.key] = {
      description: type.description,
      emoji: type.emoji,
      value: type.value,
    };
    return acc;
  }, {}),
  messages,
};
