package com.ftq.controller;

import com.ftq.bo.Sanseqiu;
import com.ftq.bo.UserBo;
import com.ftq.service.UserSer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class JiSuan {
    @Resource
    UserSer userSer;

    @RequestMapping(value = "tt",method= RequestMethod.POST)
    @ResponseBody
    public String getName(){
       String s =  userSer.getName("ss");
        return s;
    }

    @RequestMapping(value = "getSanseqiu",method= RequestMethod.POST)
    @ResponseBody
    public Map getSanseqiu(){
        Map map = new HashMap();
        Map map1 = new HashMap();
        UserBo bo = new UserBo();
        bo.setAge("19");
        bo.setName("lili");
        Object[] arr = {bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo,bo};
        map1.put("data",arr);
        return map1;
    }

    @RequestMapping(value = "getEcahrt",method= RequestMethod.POST)
    @ResponseBody
    public Map getEcahrt(){
        String s = "%1";
        List<Sanseqiu> shuju =  userSer.getSanseqiu(s);
        Map map = new HashMap();
        int[] Arr = new int[35];
        for(int x = 0; x < Arr.length; x++) {
            Arr[x] = 0;
        }
        for(int i = 0;i<shuju.size();i++){
            int one  = Integer.parseInt(shuju.get(i).getOne());
            int two  = Integer.parseInt(shuju.get(i).getTwo());
            int three  = Integer.parseInt(shuju.get(i).getThree());
            int four  = Integer.parseInt(shuju.get(i).getFour());
            int five  = Integer.parseInt(shuju.get(i).getFive());
            Arr[one-1]++;
            Arr[two-1]++;
            Arr[three-1]++;
            Arr[four-1]++;
            Arr[five-1]++;
        }
        map.put("Arr",Arr);
        return map;
    }

}
