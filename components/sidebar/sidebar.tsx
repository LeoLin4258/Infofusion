import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { ChatIcon } from "../icons/sidebar/chat-icon";
import { LangIcon } from "../icons/sidebar/lang-icon";
import { DarkModeSwitch } from "../navbar/darkmodeswitch";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="主页"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              {/* <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              /> */}
              <SidebarItem
                isActive={pathname === "/chat"}
                title="聊天"
                icon={<ChatIcon />}
                href="chat"
              />
              {/* <SidebarItem
                isActive={pathname === "/categories"}
                title="Categories"
                icon={<CustomersIcon />}
                href="categories"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}

              {/* <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              /> */}
              {/* <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="General">
              {/* <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              /> */}
              {/* <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              /> */}
              <SidebarItem
                isActive={pathname === "/settings"}
                title="设置"
                icon={<SettingsIcon />}
                href="settings"
              />
            </SidebarMenu>

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/docs"}
                title="文档"
                icon={<ChangeLogIcon />}
                href="docs"
              />
            </SidebarMenu> */}
          </div>
          <div className={Sidebar.Footer()}>
          <DarkModeSwitch />
            {/* <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <div className="max-w-fit cursor-pointer">
                  <LangIcon />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Language Actions" selectionMode="single" disallowEmptySelection selectedKeys={["English"]}>
                <DropdownItem key="English">English</DropdownItem>
                <DropdownItem key="Chinese">中文</DropdownItem>
                <DropdownItem key="Spanish">Español</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip> */}
          </div>
        </div>
      </div>
    </aside>
  );
};
