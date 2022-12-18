// 🍹 PIE CHART display on ProfilePage.js with userdata for taste profile 🍹
//Inspiration from https://www.youtube.com/watch?v=bL3P9CqQkKw&t=57s&ab_channel=LeighHalliday
// Library from AirBnb https://airbnb.io/visx/docs
// TODO: implement user data -> already sent to the db, just has to be added ✅
import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { useTranslation } from "react-i18next";

export default function ProfileChart() {
  // import copy translations from i18n
  const { t } = useTranslation();

  // Defining the tags in ammount and words
  const tastetags = [
    {
      symbol: t("profilepage.tags.taste1"),
      color: "#FFAA5C",
      tasteAmmount: 50,
    },
    {
      symbol: t("profilepage.tags.taste2"),
      color: "#FFE598",
      tasteAmmount: 20,
    },
    {
      symbol: t("profilepage.tags.taste3"),
      color: "#DB5937",
      tasteAmmount: 20,
    },
    {
      symbol: t("profilepage.tags.taste4"),
      color: "#FDA110",
      tasteAmmount: 20,
    },
  ];
  const [active, setActive] = useState(null);
  const width = 120;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={tastetags}
            pieValue={(data) => data.tasteAmmount}
            outerRadius={half}
            innerRadius={({ data }) => {
              //Border size is shown here in active
              const size = active && active.symbol === data.symbol ? 23 : 20;
              return half - size;
            }}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          {active ? (
            <>
              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={15}
                dy={20}
              >
                {`${active.symbol}`}
              </Text>
            </>
          ) : (
            <></>
          )}
        </Group>
      </svg>
    </main>
  );
}
