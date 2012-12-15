var PLUGIN_INFO =
<KeySnailPlugin>
  <name>TabSnail</name>
  <description>Manipulate tabs with keysnail</description>
  <description lang="ja">キーボードでタブを操作</description>
  <version>1.0.6</version>
  <updateURL>http://github.com/gifnksm/TabSnail/raw/master/tabsnail.ks.js</updateURL>
  <author mail="makoto.nksm@gmail.com" homepage="http://d.hatena.ne.jp/gifnksm/">gifnksm</author>
  <license>The MIT License</license>
  <license lang="ja">MIT ライセンス</license>
  <include>main</include>
  <minVersion>1.8.2</minVersion>
</KeySnailPlugin>;


// ChangeLog
//
// ==== 1.0.6 (2012/12/15) ====
//
// * Fix 'tst-togle-autohide-tabbar' (thanks to Michael Heerdegen)
//   It works properly now, even if TST's Auto hide mode is "Auto Hide tab bar".
//
// ==== 1.0.5 (2012/09/02) ====
//
// * Add 'tst-select-root-tab', 'tst-move-root-tab-left', 'tst-move-root-tab-right'
//
// ==== 1.0.4 (2011/04/24) ====
//
// * Fix PLUGIN_INFO (fix keybinding samples, thanks to azu)
//
// ==== 1.0.3 (2010/09/14) ====
//
// * Fix PLUGIN_INFO (using plugins.withProvides)
//
// ==== 1.0.2 (2010/09/14) ====
//
// * Fix PLUGIN_INFO (key binding example)
//
// ==== 1.0.1 (2010/09/10) ====
//
// * Fix PLUGIN_INFO (description)
//
// ==== 1.0.0 (2010/09/09) ====
//
// * First release
//


const tstEnabled = 'TreeStyleTabService' in window;
const TSTS = tstEnabled ? TreeStyleTabService : null;

const SelectedTab = {
  get tab() gBrowser.selectedTab,
  set tab(value) {
    if (value !== null)
      gBrowser.selectedTab = value;
    return gBrowser.selectedTab;
  },
  get parent() TSTS.getParentTab(SelectedTab.tab),
  get root() TSTS.getRootTab(SelectedTab.tab),
  get firstChild() TSTS.getFirstChildTab(SelectedTab.tab),
  get lastChild() TSTS.getLastChildTab(SelectedTab.tab),
  get firstSibling() {
    let parent = SelectedTab.parent;
    if (parent === null)
      return TSTS.rootTabs[0];
    return TSTS.getFirstChildTab(parent);
  },
  get lastSibling() {
    let parent = SelectedTab.parent;
    if (parent === null) {
      let roots = TSTS.rootTabs;
      return roots[roots.length - 1];
    }
    return TSTS.getLastChildTab(parent);
  },
  get nextSibling() TSTS.getNextSiblingTab(SelectedTab.tab),
  get previousSibling() TSTS.getPreviousSiblingTab(SelectedTab.tab)
};


plugins.withProvides(function(provide) {
  // タブの選択
  provide('select-first-tab', function(aEvent, aArgument) {
    gBrowser.mTabContainer.selectedIndex = 0;
  }, M({ ja: '最初のタブを選択する', en: 'Select first tab' }));

  provide('select-last-tab', function(aEvent, aArgument) {
    gBrowser.mTabContainer.selectedIndex = gBrowser.mTabs.length - 1;
  }, M({ ja: '最後のタブを選択する', en: 'Select last tab' }));

  if (tstEnabled) {
    provide('tst-select-parent-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.parent;
    }, M({ ja: '親タブを選択する', en: 'Select parent tab' }));
    provide('tst-select-root-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.root;
    }, M({ ja: 'ルートタブを選択する', en: 'Select root tab' }));

    provide('tst-select-first-child-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.firstChild;
    }, M({ ja: '最初の子タブを選択する', en: 'Select first child tab' }));
    provide('tst-select-last-child-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.lastChild;
    }, M({ ja: '最後の子タブを選択する', en: 'Select last child tab' }));

    provide('tst-select-first-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.firstSibling;
    }, M({ ja: '最初の兄弟タブを選択する', en: 'Select first sibling tab' }));
    provide('tst-select-last-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.lastSibling;
    }, M({ ja: '最後の兄弟タブを選択する', en: 'Select last sibling tab' }));

    provide('tst-select-previous-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.previousSibling || SelectedTab.lastSibling;
    }, M({ ja: '前の兄弟タブを選択する', en: 'Select previous sibling tab' }));
    provide('tst-select-next-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.nextSibling || SelectedTab.firstSibling;
    }, M({ ja: '次の兄弟タブを選択する', en: 'Select next sibling tab' }));
  }

  // タブの移動
  provide('read-selected-tab-later', function(aEvent, aArgument) {
    let pos = gBrowser._tPos;
    gBrowser.moveTabTo(gBrowser.mCurrentTab,
                       gBrowser.mTabContainer.childNodes.length - 1);
    gBrowser.selectedTab = gBrowser.mTabs[pos];
  }, M({ ja: '選択中のタブを後回しにする', en: 'Read selected tab later' }));

  if (tstEnabled) {
    provide('tst-read-selected-tab-later', function(aEvent, aArgument) {
      let current = SelectedTab.tab,
          pos     = current._tPos,
          target  = SelectedTab.lastSibling;
      if (TSTS.hasChildTabs(target)) {
        // 選択中のタブに子が無いとき何故か動かない
        // target = TSTS.getLastDescendantTab(target);
        let tabs = TSTS.getDescendantTabs(target);
        target = tabs[tabs.length - 1];
      }
      gBrowser.moveTabTo(current, target._tPos);
      SelectedTab.tab = gBrowser.mTabs[pos];
    }, M({ ja: '選択中のタブを後回しにする', en: 'Read selected tab later' }));

    provide('tst-move-selected-tab-left', function(aEvent, aArgument) {
      let target = SelectedTab.previousSibling || SelectedTab.lastSibling;
      gBrowser.moveTabTo(SelectedTab.tab, target._tPos);
    }, M({ ja: '選択中のタブを左へ移動する', en: 'Move selected tab(s) left' }));
    provide('tst-move-selected-tab-right', function(aEvent, aArgument) {
      let target = SelectedTab.nextSibling || SelectedTab.firstSibling;
      if (TSTS.hasChildTabs(target)) {
        // 選択中のタブに子が無いとき何故か動かない
        // target = TSTS.getLastDescendantTab(target);
        let tabs = TSTS.getDescendantTabs(target);
        target = tabs[tabs.length - 1];
      }
      gBrowser.moveTabTo(SelectedTab.tab, target._tPos);
    }, M({ ja: '選択中のタブを右へ移動する', en: 'Move selected tab(s) right' }));

    provide('tst-move-root-tab-left', function(aEvent, aArgument) {
      let root = SelectedTab.root;
      let target = TSTS.getPreviousSiblingTab(root);
      gBrowser.treeStyleTab.moveTabs([root], target);
    }, M({ ja: '選択中のタブのルートタブを左へ移動する', en: 'Move selected tab\'s root left' }));
    provide('tst-move-root-tab-right', function(aEvent, aArgument) {
      let root = SelectedTab.root;
      let target = TSTS.getNextSiblingTab(TSTS.getNextSiblingTab(root));
      if (target === null)
        TSTS.getFirstSibling(root);
      gBrowser.treeStyleTab.moveTabs([root], target);
    }, M({ ja: '選択中のタブのルートタブを右へ移動する', en: 'Move selected tab\'s root right' }));


    provide('tst-promote-tab', function(aEvent, aArgument) {
      TSTS.promoteCurrentTab();
    }, M({ ja: '選択中のタブを1つ上の階層に移動する',
           en: 'Move selected tab(s) to upper hierarchy' }));
    provide('tst-demote-tab', function(aEvent, aArgument) {
      TSTS.demoteCurrentTab();
    }, M({ ja: '選択中のタブを1つ下の階層に移動する',
           en: 'Move selected tab(s) to lower hierarchy'  }));
  }

  // タブバーの状態
  if (tstEnabled) {
    provide('tst-toggle-collapse-expand-tree', function (aEvent, aArgument) {
      let target = TSTS.hasChildTabs(SelectedTab.tab)
        ? SelectedTab.tab
        : SelectedTab.parent;

      if (target === null)
        return;
      gBrowser.treeStyleTab.collapseExpandSubtree(
        target, !TSTS.isSubtreeCollapsed(target));
    }, M({ ja: 'タブの折りたたみをトグル',
           en: 'Toggle selected tree between collapsed and expanded' }));

    provide('tst-toggle-autohide-tabbar', function (aEvent, aArgument) {
      const ah = gBrowser.treeStyleTab.autoHide;
      if (ah.state == "shrunken" || ah.state == "hidden")
        ah.show();
      else
        ah.hide();
    }, M({ ja: 'タブバーの表示をトグル',
           en: 'Toggle tab bar between expanded and shrunken' }), true);
  }
}, PLUGIN_INFO);

const SampleBinding = "\n>||\n" + [
  ["View", "U", "tst-select-parent-tab"],
  ["View", "C-U", "tst-select-root-tab"],
  ["View", ["t", "^"], "tst-select-first-child-tab"],
  ["View", ["t", "$"], "tst-select-last-child-tab"],
  ["View", "^", "tst-select-first-sibling-tab", true],
  ["View", "$", "tst-select-last-sibling-tab", true],
  ["View", "H", "tst-select-previous-sibling-tab"],
  ["View", "L", "tst-select-next-sibling-tab"],
  ["View", ["t", "p"], "tst-read-selected-tab-later"],
  ["Global", "C-P", "tst-move-selected-tab-left"],
  ["Global", "C-N", "tst-move-selected-tab-right"],
  ["Global", "C-M-P", "tst-move-root-tab-left"],
  ["Global", "C-M-N", "tst-move-root-tab-right"],
  ["Global", "C-B", "tst-promote-tab"],
  ["Global", "C-F", "tst-demote-tab"],
  ["View", ["t", "SPC"], "tst-toggle-collapse-expand-tree", true],
  ["View", ["t", "t"], "tst-toggle-autohide-tabbar", true]
].map(function([aMap, aKey, aExt, aNoRepeat]) {
  let description = ext.description(aExt);

  if (description === "")
    return "";

  return util.format(
    "key.set%sKey(%s, function(ev, arg) {\n"
      + "  ext.exec(%s, arg, ev);\n"
      + "}, '%s'%s);",
    aMap, uneval(aKey), uneval(aExt), description,
    aNoRepeat ? ", true" : "");
}).join("\n\n") + "\n||<\n";

function addDetail(aDetail, aLang) {
  aDetail = L(aDetail).replace(/#SampleBinding/g, SampleBinding);
  let element = <detail/>;
  if (aLang !== undefined)
    element.@lang = aLang;
  element.appendChild(new XML("<![CDATA[" + aDetail + "]]>"));
  PLUGIN_INFO.appendChild(element);
}

addDetail(<><![CDATA[
=== 使いかた ===

    タブの操作に便利なエクステ (コマンド) を追加します．
    ツリー型タブ https://addons.mozilla.org/ja/firefox/addon/5890/ がインストールされていると，ツリー構造に基づいてタブを操作するエクステ (tst-*) も利用できるようになります．

    .keysnail.js に以下のような設定を記述することにより，特定のキーにエクステを割り当てることもできます．

    #SampleBinding
]]></>.toString(), "ja" );

addDetail(<><![CDATA[
=== Usage ===
    You can use exts (commands) to manipulate tabs.
    If you installed Tree Style Tab https://addons.mozilla.org/ja/firefox/addon/5890/ , you can also use exts to manipulate tree structure of tabs (tst-*).

    Key bind examples are below. Paste code below to your .keysnail.js file.

    #SampleBinding
]]></>.toString());
