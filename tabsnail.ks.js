var PLUGIN_INFO =
  <KeySnailPlugin>
    <name>TabSnail</name>
    <description>Manipulate tabs with keysnail</description>
    <description lang="ja">キーボードでタブを操作</description>
    <version>1.0.2</version>
    <updateURL>http://github.com/gifnksm/TabSnail/raw/master/tabsnail.ks.js</updateURL>
    <author mail="makoto.nksm@gmail.com" homepage="http://d.hatena.ne.jp/gifnksm/">gifnksm</author>
    <license>The MIT License</license>
    <license lang="ja">MIT ライセンス</license>
    <include>main</include>
    <provides>
      <ext>select-first-tab</ext>
      <ext>select-last-tab</ext>
      <ext>tst-select-parent-tab</ext>
      <ext>tst-select-first-child-tab</ext>
      <ext>tst-select-last-child-tab</ext>
      <ext>tst-select-first-sibling-tab</ext>
      <ext>tst-select-last-sibling-tab</ext>
      <ext>tst-select-previous-sibling-tab</ext>
      <ext>tst-select-next-sibling-tab</ext>
      <ext>read-selected-tab-later</ext>
      <ext>tst-read-selected-tab-later</ext>
      <ext>tst-move-selected-tab-left</ext>
      <ext>tst-move-selected-tab-right</ext>
      <ext>tst-promote-tab</ext>
      <ext>tst-demote-tab</ext>
      <ext>tst-toggle-collapse-expand-tree</ext>
      <ext>tst-toggle-autohide-tabbar</ext>
    </provides>
  <minVersion>1.6.5</minVersion>
  <detail lang="ja"><![CDATA[
=== 使いかた ===

    タブの操作に便利なエクステ (コマンド) を追加します．
    ツリー型タブ https://addons.mozilla.org/ja/firefox/addon/5890/ がインストールされていると，ツリー構造に基づいてタブを操作するエクステ (tst-*) も利用できるようになります．

    .keysnail.js に以下のような設定を記述することにより，特定のキーにエクステを割り当てることもできます．

>||
key.setViewKey(['U'], function (ev, arg) {
    ext.exec("tst-select-parent-tab", arg, ev);
}, '親タブを選択する');

key.setViewKey(['t', '^'], function (ev, arg) {
    ext.exec("tst-select-first-child-tab", arg, ev);
}, '最初の子タブを選択する');

key.setViewKey(['t', '$'], function (ev, arg) {
    ext.exec("tst-select-last-child-tab", arg, ev);
}, '最後の子タブを選択する');

key.setViewKey('^', function (ev, arg) {
    ext.exec("tst-select-first-sibling-tab", arg, ev);
}, '最初の兄弟タブを選択する', true);

key.setViewKey('$', function (ev, arg) {
    ext.exec("tst-select-last-sibling-tab", arg, ev);
}, '最後の兄弟タブを選択する', true);

key.setViewKey('H', function (ev, arg) {
    ext.exec("tst-select-previous-sibling-tab", arg, ev);
}, '前の兄弟タブを選択する');

key.setViewKey('L', function (ev, arg) {
    ext.exec("tst-select-next-sibling-tab", arg, ev);
}, '次の兄弟タブを選択する');

key.setViewKey(['t', 'p'], function (ev, arg) {
    ext.exec("tst-read-selected-tab-later", arg, ev);
}, '選択中のタブを後回しにする');

key.setGlobalKey('C-P', function (ev, arg) {
    ext.exec('tst-move-selected-tab-left', arg, ev);
}, '選択中のタブを左へ移動する');

key.setGlobalKey('C-N', function (ev, arg) {
    ext.exec('tst-move-selected-tab-right', arg, ev);
}, '選択中のタブを右へ移動する');

key.setGlobalKey('C-B', function (ev, arg) {
    ext.exec("tst-promote-tab", arg, ev);
}, '選択中のタブを1つ上の階層に移動する');

key.setGlobalKey('C-F', function (ev, arg) {
    ext.exec("tst-demote-tab", arg, ev);
}, '選択中のタブを1つ下の階層に移動する');

key.setViewKey(['t', 'SPC'], function (ev, arg) {
    ext.exec("tst-toggle-collapse-expand-tree", arg, ev);
}, 'タブの折りたたみをトグル', true);

key.setViewKey(['t', 't'], function (ev, arg) {
    ext.exec("tst-toggle-autohide-tabbar", arg, ev);
}, 'タブバーの表示をトグル', true);
||<
  ]]></detail>
  <detail><![CDATA[
=== Usage ===
    You can use exts (commands) to manipulate tabs.
    If you installed Tree Style Tab https://addons.mozilla.org/ja/firefox/addon/5890/ , you can also use exts to manipulate tree structure of tabs (tst-*).

    Key bind examples are below. Paste code below to your .keysnail.js file.
>||
key.setViewKey(['U'], function (ev, arg) {
    ext.exec("tst-select-parent-tab", arg, ev);
}, 'Select parent tab');

key.setViewKey(['t', '^'], function (ev, arg) {
    ext.exec("tst-select-first-child-tab", arg, ev);
}, 'Select first child tab'';

key.setViewKey(['t', '$'], function (ev, arg) {
    ext.exec("tst-select-last-child-tab", arg, ev);
}, 'Select last child tab');

key.setViewKey('^', function (ev, arg) {
    ext.exec("tst-select-first-sibling-tab", arg, ev);
}, 'Select first sibling tab', true);

key.setViewKey('$', function (ev, arg) {
    ext.exec("tst-select-last-sibling-tab", arg, ev);
}, 'Select last sibling tab', true);

key.setViewKey('H', function (ev, arg) {
    ext.exec("tst-select-previous-sibling-tab", arg, ev);
}, 'Select previous sibling tab');

key.setViewKey('L', function (ev, arg) {
    ext.exec("tst-select-next-sibling-tab", arg, ev);
}, 'Select next sibling tab');

key.setViewKey(['t', 'p'], function (ev, arg) {
    ext.exec("tst-read-selected-tab-later", arg, ev);
}, 'Read selected tab later');

key.setGlobalKey('C-P', function (ev, arg) {
    ext.exec('tst-move-selected-tab-left', arg, ev);
}, 'Move selected tab(s) left');

key.setGlobalKey('C-N', function (ev, arg) {
    ext.exec('tst-move-selected-tab-right', arg, ev);
}, 'Move selected tab(s) right');

key.setGlobalKey('C-B', function (ev, arg) {
    ext.exec("tst-promote-tab", arg, ev);
}, 'Move selected tab(s) to upper hierarchy');

key.setGlobalKey('C-F', function (ev, arg) {
    ext.exec("tst-demote-tab", arg, ev);
}, 'Move selected tab(s) to lower hierarchy');

key.setViewKey(['t', 'SPC'], function (ev, arg) {
    ext.exec("tst-toggle-collapse-expand-tree", arg, ev);
}, 'Toggle selected tree between collapsed and expanded', true);

key.setViewKey(['t', 't'], function (ev, arg) {
    ext.exec("tst-toggle-autohide-tabbar", arg, ev);
}, 'Toggle tab bar between expanded and shrunken', true);
||<
  ]]></detail>
</KeySnailPlugin>;


// ChangeLog
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



// タブの選択
{
  ext.add('select-first-tab', function(aEvent, aArgument) {
    gBrowser.mTabContainer.selectedIndex = 0;
  }, M({ ja: '最初のタブを選択する', en: 'Select first tab' }));

  ext.add('select-last-tab', function(aEvent, aArgument) {
    gBrowser.mTabContainer.selectedIndex = gBrowser.mTabs.length - 1;
  }, M({ ja: '最後のタブを選択する', en: 'Select last tab' }));

  if (tstEnabled) {
    ext.add('tst-select-parent-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.parent;
    }, M({ ja: '親タブを選択する', en: 'Select parent tab' }));

    ext.add('tst-select-first-child-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.firstChild;
    }, M({ ja: '最初の子タブを選択する', en: 'Select first child tab' }));
    ext.add('tst-select-last-child-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.lastChild;
    }, M({ ja: '最後の子タブを選択する', en: 'Select last child tab' }));

    ext.add('tst-select-first-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.firstSibling;
    }, M({ ja: '最初の兄弟タブを選択する', en: 'Select first sibling tab' }));
    ext.add('tst-select-last-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.lastSibling;
    }, M({ ja: '最後の兄弟タブを選択する', en: 'Select last sibling tab' }));

    ext.add('tst-select-previous-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.previousSibling || SelectedTab.lastSibling;
    }, M({ ja: '前の兄弟タブを選択する', en: 'Select previous sibling tab' }));
    ext.add('tst-select-next-sibling-tab', function(aEvent, aArgument) {
      SelectedTab.tab = SelectedTab.nextSibling || SelectedTab.firstSibling;
    }, M({ ja: '次の兄弟タブを選択する', en: 'Select next sibling tab' }));
  }
}

// タブの移動
{
  ext.add('read-selected-tab-later', function(aEvent, aArgument) {
    let pos = gBrowser._tPos;
    gBrowser.moveTabTo(gBrowser.mCurrentTab,
                       gBrowser.mTabContainer.childNodes.length - 1);
    gBrowser.selectedTab = gBrowser.mTabs[pos];
  }, M({ ja: '選択中のタブを後回しにする', en: 'Read selected tab later' }));

  if (tstEnabled) {
    ext.add('tst-read-selected-tab-later', function(aEvent, aArgument) {
      let current = SelectedTab.tab,
          pos = current._tPos,
          target = SelectedTab.lastSibling;
      if (TSTS.hasChildTabs(target)) {
        // 選択中のタブに子が無いとき何故か動かない
        // target = TSTS.getLastDescendantTab(target);
        let tabs = TSTS.getDescendantTabs(target);
        target = tabs[tabs.length - 1];
      }
      gBrowser.moveTabTo(current, target._tPos);
      SelectedTab.tab = gBrowser.mTabs[pos];
    }, M({ ja: '選択中のタブを後回しにする', en: 'Read selected tab later' }));

    ext.add('tst-move-selected-tab-left', function(aEvent, aArgument) {
      let target = SelectedTab.previousSibling || SelectedTab.lastSibling;
      gBrowser.moveTabTo(SelectedTab.tab, target._tPos);
    }, M({ ja: '選択中のタブを左へ移動する', en: 'Move selected tab(s) left' }));
    ext.add('tst-move-selected-tab-right', function(aEvent, aArgument) {
      let target = SelectedTab.nextSibling || SelectedTab.firstSibling;
      if (TSTS.hasChildTabs(target)) {
        // 選択中のタブに子が無いとき何故か動かない
        // target = TSTS.getLastDescendantTab(target);
        let tabs = TSTS.getDescendantTabs(target);
        target = tabs[tabs.length - 1];
      }
      gBrowser.moveTabTo(SelectedTab.tab, target._tPos);
    }, M({ ja: '選択中のタブを右へ移動する', en: 'Move selected tab(s) right' }));

    ext.add('tst-promote-tab', function(aEvent, aArgument) {
      TSTS.promoteCurrentTab();
    }, M({ ja: '選択中のタブを1つ上の階層に移動する',
           en: 'Move selected tab(s) to upper hierarchy' }));
    ext.add('tst-demote-tab', function(aEvent, aArgument) {
      TSTS.demoteCurrentTab();
    }, M({ ja: '選択中のタブを1つ下の階層に移動する',
           en: 'Move selected tab(s) to lower hierarchy'  }));
  }
}

// タブバーの状態
{
  if (tstEnabled) {
    ext.add('tst-toggle-collapse-expand-tree', function (aEvent, aArgument) {
      let target = TSTS.hasChildTabs(SelectedTab.tab)
        ? SelectedTab.tab
        : SelectedTab.parent;

      if (target === null)
        return;
      gBrowser.treeStyleTab.collapseExpandSubtree(
        target, !TSTS.isSubtreeCollapsed(target));
    }, M({ ja: 'タブの折りたたみをトグル',
           en: 'Toggle selected tree between collapsed and expanded' }));

    ext.add('tst-toggle-autohide-tabbar', function (aEvent, aArgument) {
      const ah = gBrowser.treeStyleTab.autoHide;
      if (ah.state == "shrunken")
        ah.show();
      else
        ah.hide();
    }, M({ ja: 'タブバーの表示をトグル',
           en: 'Toggle tab bar between expanded and shrunken' }), true);
  }
}
