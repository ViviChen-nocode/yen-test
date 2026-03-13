/**
 * Google Apps Script — 接收問卷資料並寫入 Google Sheets
 *
 * 設定步驟：
 * 1. 開啟 Google Sheets，建立一個新試算表
 * 2. 在第一列（Row 1）填入以下欄位標題：
 *    timestamp | age_filter | bank_filter | ta1 | ta2 | ta3 | ta4 | io1 | io2 | io3 | io4 | eu1 | eu2 | eu3 | eu4 | tr1 | tr2 | tr3 | tr4 | pr1 | pr2 | pr3 | pr4 | pv1 | pv2 | pv3 | pv4 | ui1 | ui2 | ui3 | ui4 | gender | age | education | occupation | income | has_account
 *
 * 3. 點選「擴充功能」→「Apps Script」
 * 4. 將下方程式碼貼上，取代原本的 Code.gs 內容
 * 5. 點選「部署」→「新增部署作業」
 *    - 類型選「網頁應用程式」
 *    - 存取權限設為「所有人」
 *    - 點「部署」並複製產生的 URL
 * 6. 將該 URL 貼到 index.html 中的 GOOGLE_SCRIPT_URL 常數
 */

const SHEET_NAME = 'Sheet1'; // 如果你的工作表名稱不同，請修改

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);

    // 定義欄位順序（與試算表標題對應）
    const fields = [
      'timestamp',
      'age_filter', 'bank_filter',
      'ta1', 'ta2', 'ta3', 'ta4',
      'io1', 'io2', 'io3', 'io4',
      'eu1', 'eu2', 'eu3', 'eu4',
      'tr1', 'tr2', 'tr3', 'tr4',
      'pr1', 'pr2', 'pr3', 'pr4',
      'pv1', 'pv2', 'pv3', 'pv4',
      'ui1', 'ui2', 'ui3', 'ui4',
      'gender', 'age', 'education', 'occupation', 'income', 'has_account'
    ];

    const row = fields.map(f => data[f] || '');
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Survey API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 初始化：自動建立標題列
 * 在 Apps Script 編輯器中選擇此函式，按「執行」即可
 * 只需要執行一次
 */
function setupHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const headers = [
    'timestamp',
    'age_filter', 'bank_filter',
    'ta1', 'ta2', 'ta3', 'ta4',
    'io1', 'io2', 'io3', 'io4',
    'eu1', 'eu2', 'eu3', 'eu4',
    'tr1', 'tr2', 'tr3', 'tr4',
    'pr1', 'pr2', 'pr3', 'pr4',
    'pv1', 'pv2', 'pv3', 'pv4',
    'ui1', 'ui2', 'ui3', 'ui4',
    'gender', 'age', 'education', 'occupation', 'income', 'has_account'
  ];

  // 寫入標題列
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // 粗體 + 凍結第一列
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
