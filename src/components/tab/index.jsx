import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/system';

export default function TabCustom({ tabTitles = [], tabComponents = [] }) {
    console.log(tabTitles)
  return (
      <Tabs defaultValue={0} >
          <TabsList>
              {tabTitles.map((tabTitle, index) => (
                <Tab key={tabTitle} value={index}>{tabTitle}</Tab>
              ))}
          </TabsList>
          {
            tabComponents.map((tabComponent, index) => (
              <TabPanel key={index} value={index}>{tabComponent}</TabPanel>
            ))
          }
    </Tabs>
  );
}


const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  cursor: pointer;
  font-size: 0.775rem;
  background-color: transparent;
  padding: 10px 12px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: transparent;
  outline: none;
&.${tabClasses.selected} {
     color: #0D44AE;
    border-color:  #0D44AE;
}
  &:hover {
      color: #0D44AE;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  border-radius: 12px;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
  `,
);
