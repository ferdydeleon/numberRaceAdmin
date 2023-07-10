import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout"; //working
import MainLayout from "src/layouts/MainLayout"; //working

import EventCreate from "src/views/event/EventCreate"; //working
import EventView from "src/views/event/EventView"; //working
import EventEdit from "src/views/event/EventEdit"; //working
import EventDeal from "src/views/event/EventDeal"; //working
import EventFight from "src/views/event/EventFight"; //working
import EventFightBet from "src/views/event/EventFightBet"; //working
import EventFightHistory from "src/views/event/EventFightHistory"; //working

import DashboardView from "src/views/reports/DashboardView"; //working
import LoginView from "src/views/auth/LoginView"; //working
import NotFoundView from "src/views/errors/NotFoundView";
import NoAccess from "src/views/errors/NoAccess.js";

import RegisterView from "src/views/auth/RegisterView";

import ArenaList from "src/views/arena/ArenaList"; //working
import AccountView from "src/views/account/AccountView";
import AccountPlayers from "src/views/account/AccountPlayers";
import DetailtotalPoints from "src/views/account/Detail_total_Points";
import DetailtotalCommission from "src/views/account/Detail_total_Commission";

// import AccountViewPlayers from 'src/views/account/AccountViewPlayers';
import AccountMyPlayers from "src/views/account/AccountMyPlayers";
import AccountAgentTree from "src/views/account/AccountAgentTree";
import AccountMAPlayers from "src/views/account/AccountMAPlayers";

import AccountCreateUsers from "src/views/account/AccountCreateUsers";
import AccountEdit from "src/views/account/AccountEdit"; // working
import AccountRequestWallet from "src/views/account/AccountRequestWallet"; //working
import AccountCommission from "src/views/account/AccountRequestCommission"; // working
// import AccountPayboritWallet from 'src/views/account/AccountPayboritWallet'; //working

// import FundCreate from 'src/views/fund/FundCreate';
import FundView from "src/views/fund/FundView";
import FundRequest from "src/views/fund/FundRequest";
import FundTopUp from "src/views/fund/FundTopUp"; //working
import FundWithdraw from "src/views/fund/FundWithdraw"; //working
import FundWithdrawTotal from "src/views/fund/FundWithdrawTotal"; //working
import Fundlogswithdraw from "src/views/fund/FundLogsWithdraw"; //working

import FundCommission from "src/views/fund/FundCommission"; //working
import FundRequestWithdraw from "src/views/fund/FundRequestWithdraw";
import FundManualConvertCommi from "src/views/fund/FundManualConvertCommi"; //working

import CompanyFundCreate from "src/views/company/CompanyFundCreate";
import CompanyFund from "src/views/company/CompanyFund";
import DrawFund from "src/views/company/DrawFund";
import BankerFund from "src/views/company/BankerFund";

import Announcement from "src/views/announcement/Announcement";
import ReportFund from "src/views/reports/ReportsFund";
import ReportIncome from "src/views/reports/ReportsIncome";
import ReportDrawFund from "src/views/reports/ReportsDrawFund";
// import ReportBankerFund from "src/views/reports/ReportsBankerFund";

import ReportBetHistory from "src/views/reports/ReportsBetHistory";
import ReportPointsHistory from "src/views/reports/ReportsPointsHistory";
import ReportsCommissionHistory from "src/views/reports/ReportsCommissionHistory";
import ReportsBetEvent from "src/views/reports/ReportsBetEvent";
import ReportPlayersHistory from "src/views/reports/ReportsPlayersHistory";
import ReportsEvent from "src/views/reports/ReportsEvent";
import ReportsEventDetails from "src/views/reports/ReportsEventDetails";
import ReportsSeperateDetails from "src/views/reports/ReportsSeperateDetails";
import ReportsSeparateIncome from "src/views/reports/ReportsSeparateIncome";
import ReportsByEvent from "src/views/reports/ReportsByEvent";
import ReportsBooster from "src/views/reports/ReportsBooster";

import BlockUser from "src/views/blocking/BlockUser";
import BlockList from "src/views/blocking/BlockList";

import ExemptedUser from "src/views/exempted/ExemptedUser";
import ExemptedList from "src/views/exempted/ExemptedList";

import DownlineTree from "src/views/tree/DownlineTree";
import UplineTree from "src/views/tree/UplineTree";

// GPT
// import GptCheckDeposit from "src/views/Gpt/CheckDeposit";
// import GptCheckWithdraw from "src/views/Gpt/GptCheckWithdraw";

import Api from "./Api";

const accounting_access = Api.ACCOUNTING_USER.ACCTG.filter(
  (item) => item.username === Api.request.username
);
// const access_dashboard = parseInt(accounting_access.map((val) => val.view_dashboard)) === 1;
// const access_histoy_fund = accounting_access.map(val => val.histoy_fund) == 1;

// COMPANY FUND
const access_create_fund =
  parseInt(accounting_access.map((val) => val.create_fund)) === 1;
const access_histoy_fund =
  parseInt(accounting_access.map((val) => val.histoy_fund)) === 1;

// FUND MANAGEMENT
const access_request_points_view =
  parseInt(accounting_access.map((val) => val.request_points_view)) === 1;
const access_request_withdraw_view =
  parseInt(accounting_access.map((val) => val.request_withdraw_view)) === 1;
const access_top_up =
  parseInt(accounting_access.map((val) => val.top_up)) === 1;
const access_withdraw =
  parseInt(accounting_access.map((val) => val.withdraw)) === 1;
const access_withdraw_total =
  parseInt(accounting_access.map((val) => val.withdraw_total)) === 1;
const access_logs_withdrawal =
  parseInt(accounting_access.map((val) => val.logs_withdrawal)) === 1;

// COMMISSION MANAGEMENT
const access_request_commission =
  parseInt(accounting_access.map((val) => val.request_commission)) === 1;
const access_withdraw_commission =
  parseInt(accounting_access.map((val) => val.withdraw_commission)) === 1;
const access_convert_commission =
  parseInt(accounting_access.map((val) => val.convert_commission)) === 1;
// const access_roll_back_auto_cash_out = parseInt(accounting_access.map((val) => val.roll_back_auto_cash_out)) === 1;

// const payborit_dashboard = accounting_access.map(val => val.payborit_dashboard) == 1;
// const access_AutocashOut_view =
// parseInt(accounting_access.map((val) => val.AutocashOut_view)) === 1;
// const access_AutocashIn_view =
// parseInt(accounting_access.map((val) => val.AutocashIn_view)) === 1;
// const access_pending_autoCashin = accounting_access.map(val => val.pending_autoCashin) == 1;

// REPORTS
const access_income_report =
  parseInt(accounting_access.map((val) => val.income_report)) === 1;

//PLAYER HISTORY
const access_player_history =
  parseInt(accounting_access.map((val) => val.player_history)) === 1;

// AUTO CASH OUT BLOCKING
const access_block_user =
  parseInt(accounting_access.map((val) => val.block_user)) === 1;
const access_block_list =
  parseInt(accounting_access.map((val) => val.block_list)) === 1;

// AUTO CASH OUT EXEMPTED
const access_exempted_list =
  parseInt(accounting_access.map((val) => val.exempted_list)) === 1;
const access_exempted_user =
  parseInt(accounting_access.map((val) => val.exempted_user)) === 1;

const staff_access = Api.STAFF_USER.STAFF.filter(
  (item) => item.username === Api.request.username
);
const access_create_event =
  parseInt(staff_access.map((val) => val.create_event)) === 1;
const access_create_arena =
  parseInt(staff_access.map((val) => val.create_arena)) === 1;
const access_viewing_event_fight =
  parseInt(staff_access.map((val) => val.viewing_event_fight)) === 1;
const access_create_user =
  parseInt(staff_access.map((val) => val.create_user)) === 1;
const access_viewing_Users =
  parseInt(staff_access.map((val) => val.viewing_Users)) === 1;
const access_viewing_agent_tree =
  parseInt(staff_access.map((val) => val.viewing_agent_tree)) === 1;
const access_viewing_player_history =
  parseInt(staff_access.map((val) => val.viewing_player_history)) === 1;
const access_create_announcement =
  //   parseInt(staff_access.map((val) => val.create_announcement)) === 1;
  // const access_viewing_event_list =
  parseInt(staff_access.map((val) => val.viewing_event_list)) === 1;

let Rat;
if (Api.request.groupName === "STAFF") {
  if (Api.request.username === Api.request.payborit) {
    Rat = [
      {
        path: "app",
        element: <DashboardLayout />,
        children: [
          //{ path: 'account', element: <AccountView /> }, //working view porfile and change password function
          // { path: '/payborit/view', element: <PayboritView/> }, //working view request list
          // { path: '/payborit/dashboard', element: <PayboritDashBoard/> }, //working view request list
          // { path: '/payborit/autocashout', element: <PayboritAoutocashOut/> }, //working
          { path: "*", element: <Navigate to="/login" /> }, // working login page
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/login", element: <LoginView /> }, // // working login page
          { path: "register", element: <RegisterView /> },
          { path: "/", element: <Navigate to="/login" /> },
        ],
      },
    ];
  } else {
    Rat = [
      {
        path: "app",
        element: <DashboardLayout />,
        children: [
          //acount folder
          {
            path: "account/ma/players/:ref/:user/:type",
            element: <AccountMAPlayers />,
          }, //working

          { path: "account", element: <AccountView /> }, //working
          access_create_user === true
            ? { path: "account/create/user", element: <AccountCreateUsers /> }
            : "", ////working
          // { path: 'account/create/user', element: <AccountCreateUsers /> },////working
          access_request_points_view === true
            ? {
                path: "account/request/wallet",
                element: <AccountRequestWallet />,
              }
            : "", //working
          access_request_commission === true
            ? {
                path: "account/convert/commission",
                element: <AccountCommission />,
              }
            : "", //working
          { path: "account/edit/:id", element: <AccountEdit /> }, //working
          access_viewing_agent_tree === true
            ? { path: "account/myplayers/", element: <AccountMyPlayers /> }
            : "", //working
          {
            path: "account/agent/tree/:id/:user",
            element: <AccountAgentTree />,
          }, //working
          // { path: 'account/all/player', element: <AccountViewPlayers /> },//working
          access_viewing_Users === true
            ? { path: "account/players", element: <AccountPlayers /> }
            : "", //working

          // { path: 'dashboard', element: <DashboardView /> }, //working
          { path: "event/edit/:id/:status", element: <EventEdit /> }, //working
          { path: "event/list", element: <EventView /> }, //working
          access_create_event === true
            ? { path: "event/create", element: <EventCreate /> }
            : "", //working
          { path: "event/deal/:id/:title", element: <EventDeal /> }, //working
          access_viewing_event_fight === true ? { path: "event/view/", element: <EventFight /> }: "", //working
          { path: "event/deal/bet/:eventId/:fightId/:title/:fightNo/:win",element: <EventFightBet />}, //working
          {
            path: "event/fight/history/:event/:fightno/:title",
            element: <EventFightHistory />,
          }, //working
          access_create_arena === true
            ? { path: "/arena", element: <ArenaList /> }
            : "", //working
          access_viewing_player_history === true
            ? {
                path: "/reports/player/history",
                element: <ReportPlayersHistory />,
              }
            : "", //working
          { path: "/page/error", element: <NoAccess /> },
          access_create_announcement === true
            ? { path: "announcement/view", element: <Announcement /> }
            : "", //working
          // { path: 'dashboard', element: <DashboardView /> }, //working
          // { path: 'account', element: <AccountView /> },

          { path: "*", element: <Navigate to="/page" /> },
        ],
      },

      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/login", element: <LoginView /> },
          { path: "/page", element: <NotFoundView /> },
          { path: "register", element: <RegisterView /> },
          { path: "/", element: <Navigate to="/login" /> },
        ],
      },
    ];
  }
} else if (Api.request.groupName === "ACCOUNTING") {
  if (Api.request.username === Api.request.pagcor) {
    Rat = [
      {
        path: "app",
        element: <DashboardLayout />,
        children: [
          { path: "/reports/income", element: <ReportIncome /> }, //working
          {
            path: "/reports/event/:id/:eventName/:createDate",
            element: <ReportsEvent />,
          }, //working
          {
            path:
              "/reports/event/details/:event_id/:gameTpe/:banka/:eventName/:gameCode",
            element: <ReportsEventDetails />,
          }, //working
          { path: "/reports/event/", element: <ReportsByEvent /> }, //working
          { path: "/reports/booster/income", element: <ReportsBooster /> }, //working

          { path: "*", element: <Navigate to="/login" /> },
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/login", element: <LoginView /> },
          { path: "register", element: <RegisterView /> },
          { path: "/", element: <Navigate to="/login" /> },
        ],
      },
    ];
  } else {
    Rat = [
      {
        path: "app",
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardView /> }, //working
          access_create_fund === true
            ? { path: "company/fund/create", element: <CompanyFundCreate /> }
            : "", //working
          access_histoy_fund === true
            ? { path: "company/fund/view", element: <CompanyFund /> }
            : "", //working
          access_histoy_fund === true
            ? { path: "company/draw/view", element: <DrawFund /> }
            : "", //working
          access_histoy_fund === true
            ? { path: "company/banker/view", element: <BankerFund /> }
            : "", //working
          // { path: 'player/agent/tree/', element: <PlayersTree /> }, //working
          { path: "details/totalPoints", element: <DetailtotalPoints /> }, //working
          {
            path: "details/totalCommission",
            element: <DetailtotalCommission />,
          }, //working

          { path: "account", element: <AccountView /> },
          access_histoy_fund === true
            ? { path: "fund/view", element: <FundView /> }
            : "",
          access_histoy_fund === true
            ? { path: "fund/request", element: <FundRequest /> }
            : "",
          access_top_up === true
            ? { path: "fund/topup", element: <FundTopUp /> }
            : "",

          access_withdraw_total === true
            ? { path: "fund/total/withdraw", element: <FundWithdrawTotal /> }
            : "",

          access_logs_withdrawal === true
            ? { path: "fund/max/logs/withdraw", element: <Fundlogswithdraw /> }
            : "",

          access_withdraw === true
            ? { path: "fund/withdraw", element: <FundWithdraw /> }
            : "",
          { path: "fund/commission", element: <FundCommission /> },

          access_request_withdraw_view === true
            ? {
                path: "fund/request/withdraw",
                element: <FundRequestWithdraw />,
              }
            : "",

          access_request_points_view === true
            ? {
                path: "account/request/wallet",
                element: <AccountRequestWallet />,
              }
            : "", //working
          // access_AutocashIn_view == true ? { path: 'account/payborit/wallet/request', element: <AccountPayboritWallet /> } : '',//working

          //commission management
          {
            path: "account/ma/players/:ref/:user/:type",
            element: <AccountMAPlayers />,
          }, //working
          access_viewing_agent_tree === true
            ? { path: "account/myplayers/", element: <AccountMyPlayers /> }
            : "", //working
          //{ path: 'account/convert/commission', element: <AccountCommission />},//working
          access_withdraw_commission === true
            ? { path: "fund/commission", element: <FundCommission /> }
            : "",
          access_request_commission === true
            ? {
                path: "account/convert/commission",
                element: <AccountCommission />,
              }
            : "", //working
          access_convert_commission === true
            ? {
                path: "fund/manual/convert/commission/",
                element: <FundManualConvertCommi />,
              }
            : "",
          { path: "fund/commission", element: <FundCommission /> },

          access_income_report === true
            ? { path: "/reports/fund", element: <ReportFund /> }
            : "", //working
          access_income_report === true
            ? { path: "/reports/income", element: <ReportIncome /> }
            : "", //working
          { path: "/reports/draw", element: <ReportDrawFund /> }, //working
          // { path: "/reports/banker", element: <ReportBankerFund /> }, //working
          {
            path: "/reports/bet/:id/:user/:event/:title",
            element: <ReportBetHistory />,
          }, //working
          {
            path: "/reports/points/:id/:user",
            element: <ReportPointsHistory />,
          }, //working
          {
            path: "/reports/commission/:id/:user",
            element: <ReportsCommissionHistory />,
          }, //working
          {
            path: "/reports/event/bet/:id/:user",
            element: <ReportsBetEvent />,
          }, //working

          {
            path:
              "/reports/event/details/:event_id/:gameTpe/:banka/:eventName/:gameCode",
            element: <ReportsEventDetails />,
          }, //working
          { path: "/reports/event/", element: <ReportsByEvent /> }, //working
          { path: "/reports/booster/income", element: <ReportsBooster /> }, //working
          {
            path: "/reports/actual/income",
            element: <ReportsSeparateIncome />,
          }, //working
          {
            path:
              "/reports/event/seperate/income/details/:eventId/:eventName/:gameCode",
            element: <ReportsSeperateDetails />,
          }, //working

          {
            path: "/reports/event/:id/:eventName/:createDate",
            element: <ReportsEvent />,
          }, //working
          access_player_history === true
            ? {
                path: "/reports/player/history",
                element: <ReportPlayersHistory />,
              }
            : "", //working

          // access_pending_autoCashin == true ? { path: '/payborit/cashin/request', element: <PayboritRequest /> } : '', //working
          // access_roll_back_auto_cash_out == true ? { path: '/payborit/withdraw/request', element: <PayboritWithdrawRequest /> } : '', //working
          // payborit_dashboard == true ? { path: '/payborit/dashboard', element: <PayboritDashBoard /> } : '', //working
          // access_AutocashOut_view == true ? { path: '/payborit/autocashout', element: <PayboritAoutocashOut /> } : '', //working

          access_block_user === true
            ? { path: "block/view", element: <BlockUser /> }
            : "", //working
          access_block_list === true
            ? { path: "block/list", element: <BlockList /> }
            : "", //working

          access_exempted_user === true
            ? { path: "exempted/view", element: <ExemptedUser /> }
            : "", //working
          access_exempted_list === true
            ? { path: "exempted/list", element: <ExemptedList /> }
            : "", //working

          { path: "agent/downline/tree/:id/:user", element: <DownlineTree /> },
          { path: "agent/upline/tree/:id/:user", element: <UplineTree /> },
          { path: "account/players", element: <AccountPlayers /> },

          // access_AutocashIn_view === true
          //   ? { path: "gpt/check-deposit/", element: <GptCheckDeposit /> }
          //   : "",
          // access_AutocashOut_view === true
          //   ? { path: "gpt/check-withdraw/", element: <GptCheckWithdraw /> }
          //   : "",

          { path: "/page/error", element: <NoAccess /> },
          { path: "*", element: <Navigate to="/page" /> },
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/login", element: <LoginView /> },
          { path: "/page", element: <NotFoundView /> },
          { path: "register", element: <RegisterView /> },
          { path: "/", element: <Navigate to="/login" /> },
        ],
      },
    ];
  }
} else {
  //console.log('ADMINasaaaaa: ', Api.request.groupName);
  Rat = [
    {
      path: "app",
      element: <DashboardLayout />,
      children: [
        { path: "agent/downline/tree/:id/:user", element: <DownlineTree /> },
        { path: "agent/upline/tree/:id/:user", element: <UplineTree /> }, //workingaccount/agent/tree/2/jm_platinum
        { path: "dashboard", element: <DashboardView /> }, //working
        { path: "event/edit/:id/:status", element: <EventEdit /> }, //working
        { path: "event/list", element: <EventView /> }, //working
        { path: "event/create", element: <EventCreate /> }, //working
        { path: "event/deal/:id/:title", element: <EventDeal /> }, //working
        { path: "event/view/", element: <EventFight /> }, //working
        { path: "event/deal/bet/:eventId/:fightId/:title/:fightNo/:win",element: <EventFightBet />}, //working

        {
          path: "event/fight/history/:event/:fightno/:title",
          element: <EventFightHistory />,
        }, //working

        {
          path: "account/ma/players/:ref/:user/:type",
          element: <AccountMAPlayers />,
        }, //working

        { path: "account", element: <AccountView /> }, //working
        { path: "account/create/user", element: <AccountCreateUsers /> }, ////working
        { path: "account/request/wallet", element: <AccountRequestWallet /> }, //working
        { path: "account/convert/commission", element: <AccountCommission /> }, //working
        { path: "account/edit/:id", element: <AccountEdit /> }, //working
        { path: "account/myplayers/", element: <AccountMyPlayers /> }, //working
        // { path:    { path: 'account/all/player', element: <AccountViewPlayers /> },//working'account/agent/tree/:id/:user', element: <AccountAgentTree /> },//working
        { path: "account/players", element: <AccountPlayers /> }, //working
        { path: "announcement/view", element: <Announcement /> }, //working
        // arena folderfund
        { path: "/arena", element: <ArenaList /> }, //working
        { path: "/reports/fund", element: <ReportFund /> }, //working
        { path: "/reports/income", element: <ReportIncome /> }, //working
        { path: "/reports/draw", element: <ReportDrawFund /> }, //working
        // { path: "/reports/banker", element: <ReportBankerFund /> }, //working
        {
          path: "/reports/bet/:id/:user/:event/:title",
          element: <ReportBetHistory />,
        }, //working
        { path: "/reports/points/:id/:user", element: <ReportPointsHistory /> }, //working
        {
          path: "/reports/commission/:id/:user",
          element: <ReportsCommissionHistory />,
        }, //working
        { path: "/reports/event/bet/:id/:user", element: <ReportsBetEvent /> }, //working
        { path: "/reports/event/", element: <ReportsByEvent /> }, //working
        {
          path:
            "/reports/event/details/:event_id/:gameTpe/:banka/:eventName/:gameCode",
          element: <ReportsEventDetails />,
        }, //working
        {
          path: "/reports/event/:id/:eventName/:createDate",
          element: <ReportsEvent />,
        }, //working
        { path: "/reports/player/history", element: <ReportPlayersHistory /> }, //working
        //super
        // { path: '/super/platinum/view', element: <SuperPlatinumView/> }, //working
        // { path: '/super/platinum/tagging/:id/:superPlatinum', element: <ViewTagging /> }, //working
        // { path: "/page/error", element: <NoAccess /> },
        // { path: "*", element: <Navigate to="/page" /> },
      ],
    },
    {
      path: "/",
      // element: <MainLayout />,
      children: [
        { path: "/login", element: <LoginView /> },
        { path: "/page", element: <NotFoundView /> },
        { path: "register", element: <RegisterView /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];
  //Admin
}
const routes = Rat;

export default routes;
