package com.ftq.service;

import com.ftq.bo.Sanseqiu;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserSer {
    public String getName(String s);

    public List<Sanseqiu> getSanseqiu(String s);


}

